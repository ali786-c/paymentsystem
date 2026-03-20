<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\GatewayConfig;
use App\Services\PaymentService;
use App\Services\SignatureService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    protected $paymentService;
    protected $signatureService;

    public function __construct(PaymentService $paymentService, SignatureService $signatureService)
    {
        $this->paymentService = $paymentService;
        $this->signatureService = $signatureService;
    }

    /**
     * Handle payment success callback from gateway.
     */
    public function success(Request $request, $invoiceId)
    {
        $invoice = Invoice::findOrFail($invoiceId);
        
        // This is a UI landing page, we usually just show success 
        // and redirect back to the merchant site.
        
        return view('payment.status', [
            'invoice' => $invoice,
            'status' => 'success',
            'return_url' => $this->getMerchantReturnUrl($invoice, 'success')
        ]);
    }

    /**
     * Handle payment cancellation.
     */
    public function cancel(Request $request, $invoiceId)
    {
        $invoice = Invoice::findOrFail($invoiceId);
        $invoice->update(['status' => 'cancelled']);

        return view('payment.status', [
            'invoice' => $invoice,
            'status' => 'cancelled',
            'return_url' => $this->getMerchantReturnUrl($invoice, 'cancel')
        ]);
    }

    /**
     * Universal Webhook handler for gateways.
     */
    public function webhook(Request $request, $providerName)
    {
        Log::info("Webhook received for {$providerName}", [
            'payload' => $request->all(),
            'headers' => $request->headers->all()
        ]);

        try {
            $provider = $this->paymentService->getProvider($providerName);
            $payload = $request->all();

            // 1. Identify the invoice from the payload
            $invoice = null;
            $externalId = null;

            if ($providerName === 'stripe') {
                $object = $payload['data']['object'] ?? [];
                $externalId = $object['id'] ?? null;
                
                // Prioritize metadata lookup for Stripe (more robust)
                $invoiceId = $object['metadata']['invoice_id'] ?? null;
                if ($invoiceId) {
                    $invoice = Invoice::find($invoiceId);
                }
            } elseif ($providerName === 'cryptomus') {
                $externalId = $payload['uuid'] ?? null;
            } elseif ($providerName === 'cardlink') {
                $externalId = $payload['txId'] ?? null;
            }

            // Fallback to gateway_reference lookup
            if (!$invoice && $externalId) {
                $invoice = Invoice::where('gateway_reference', $externalId)->first();
            }

            if (!$invoice) {
                Log::warning("Invoice not found for {$providerName} webhook. ID: {$externalId}");
                return response()->json(['success' => false, 'message' => 'Invoice not found'], 404);
            }

            Log::info("Webhook Step 1: Processing Invoice #{$invoice->id}");

            // 2. Load Gateway Config (Specific or Global Fallback)
            Log::info("Webhook Step 2: Querying GatewayConfig for merchant: {$invoice->merchant_id}");
            $config = GatewayConfig::where('gateway_name', $providerName)
                ->where(function($query) use ($invoice) {
                    $query->where('merchant_id', $invoice->merchant_id)
                          ->orWhereNull('merchant_id');
                })
                ->orderBy('merchant_id', 'desc') // Prefer merchant-specific
                ->first();

            Log::info("Webhook Step 3: GatewayConfig query finished. Found: " . ($config ? 'Yes' : 'No'));

            if (!$config) {
                $allGateways = GatewayConfig::where('merchant_id', $invoice->merchant_id)->pluck('gateway_name')->toArray();
                Log::warning("Webhook Step 4 ERROR: Config missing for '{$providerName}' for merchant #{$invoice->merchant_id}. Available gateways for this merchant: " . implode(', ', $allGateways));
                return response()->json(['success' => false, 'message' => "Gateway '{$providerName}' not configured for merchant"], 404);
            }

            Log::info("Webhook Step 4.5: Merchant Details", [
                'id' => $invoice->merchant_id,
                'name' => $invoice->merchant ? $invoice->merchant->name : 'N/A',
                'webhook_url' => $invoice->merchant ? $invoice->merchant->webhook_url : 'EMPTY!!'
            ]);

            // 3. Verify the payment with the provider
            Log::info("Webhook Step 5: Preparing to verify via {$providerName}");
            
            // We use try-catch specifically here to catch decryption errors
            try {
                $configData = $config->config_data;
                Log::info("Webhook Step 6: Config data decrypted successfully");
            } catch (\Throwable $de) {
                Log::error("Webhook Step 6 ERROR: Decryption failed for config. " . $de->getMessage());
                throw $de;
            }

            Log::info("Webhook Step 7: Calling provider verifyWebhook");
            $result = $provider->verifyWebhook($payload, $configData);
            Log::info("Webhook Step 8: Provider verification result: ", $result);

            if ($result['success']) {
                Log::info("Webhook Step 9: Updating DB status to {$result['status']}");
                $invoice->update([
                    'status' => $result['status'],
                    'payload' => array_merge($invoice->payload ?? [], ['webhook_raw' => $payload])
                ]);

                Log::info("Webhook Step 10: DB Update complete. Dispatched NotifyMerchantJob.");
                
                // 4. Notify the merchant (Phase 4 Relay)
                $this->notifyMerchant($invoice);
            } else {
                Log::warning("Webhook Step 9: Verification FAILED. Result: " . json_encode($result));
            }

            return response()->json(['success' => $result['success']]);
        } catch (\Throwable $e) {
            Log::error("Webhook CRITICAL Error ({$providerName}): " . $e->getMessage(), [
                'type' => get_class($e),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Phase 2.3: Create a checkout session (Merchant API)
     */
    public function createSession(Request $request)
    {
        $merchant = $request->merchant; // From MerchantAuthMiddleware

        $validated = $request->validate([
            'order_id' => 'required|string',
            'amount' => 'required|numeric|min:0.01',
            'currency' => 'required|string|size:3',
            'customer_email' => 'nullable|email',
            'success_url' => 'nullable|url',
            'cancel_url' => 'nullable|url',
        ]);

        $invoice = Invoice::create([
            'merchant_id' => $merchant->id,
            'external_order_id' => $validated['order_id'],
            'amount' => $validated['amount'],
            'currency' => $validated['currency'],
            'status' => 'pending',
            'payload' => [
                'customer_email' => $validated['customer_email'],
                'custom_success_url' => $validated['success_url'],
                'custom_cancel_url' => $validated['cancel_url'],
            ]
        ]);

        // Generate a checkout URL for the Hub's frontend
        // For now, we point to the Hub's UI (which we will build in Phase 3)
        $checkoutUrl = url("/checkout/{$invoice->id}");

        return response()->json([
            'success' => true,
            'checkout_url' => $checkoutUrl,
            'invoice_id' => $invoice->id
        ]);
    }

    protected function notifyMerchant(Invoice $invoice)
    {
        Log::info("Webhook Step 11: Attempting to notify merchant for Invoice #{$invoice->id}");
        $merchant = $invoice->merchant;

        if (!$merchant || !$merchant->webhook_url) {
            $mName = $merchant ? $merchant->name : 'Unknown';
            Log::warning("Webhook Step 11 ERROR: No webhook URL configured for merchant #{$invoice->merchant_id} ({$mName})");
            return;
        }

        try {
            Log::info("Webhook Step 12: Sending POST to {$merchant->webhook_url}");
            
            // We use the Job logic but run it synchronously here to bypass all queue issues
            $job = new \App\Jobs\NotifyMerchantJob($invoice);
            $job->handle(app(\App\Services\SignatureService::class));
            
            Log::info("Webhook Step 13: Notification successfully delivered to SaaS.");
        } catch (\Throwable $e) {
            Log::error("Webhook Step 12 FATAL: Merchant notification failed. " . $e->getMessage());
        }
    }

    /**
     * Fetch public invoice and merchant data for the frontend.
     */
    public function getData($invoiceId)
    {
        $invoice = Invoice::with('merchant:id,name,branding_settings')->findOrFail($invoiceId);
        return response()->json(['invoice' => $invoice]);
    }

    /**
     * Process the final gateway redirection from the selection page.
     */
    public function process(Request $request)
    {
        $validated = $request->validate([
            'invoice_id' => 'required',
            'gateway' => 'required|string'
        ]);

        $invoice = Invoice::findOrFail($validated['invoice_id']);
        
        try {
            // Update the invoice with the chosen method
            $invoice->update(['payment_method' => $validated['gateway']]);

            $redirectUrl = $this->paymentService->processInvoice($invoice, $validated['gateway']);

            return response()->json([
                'success' => true,
                'redirect_url' => $redirectUrl
            ]);
        } catch (\Exception $e) {
            Log::error("Processing Error: " . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }

    public function cardlinkForm($invoiceId)
    {
        $invoice = Invoice::findOrFail($invoiceId);
        
        $gatewayName = 'cardlink';
        $config = GatewayConfig::where('gateway_name', $gatewayName)
            ->where('merchant_id', $invoice->merchant_id)
            ->first();

        if (!$config || !$config->is_active) {
            return "Gateway not configured.";
        }

        $provider = $this->paymentService->getProvider($gatewayName);
        
        // We need to call a protected method or replicate logic to get params
        // For simplicity, we replicate the parameter logic here for the view
        $params = [
            'mid' => $config->config_data['mid'],
            'orderid' => $invoice->id,
            'orderDesc' => "Order #{$invoice->external_order_id}",
            'orderAmount' => $invoice->amount,
            'currency' => strtoupper($invoice->currency),
            'payerEmail' => $invoice->payload['customer_email'] ?? 'customer@example.com',
            'trType' => '1',
            'confirmUrl' => route('api.payment.webhook', ['provider' => 'cardlink']),
            'cancelUrl' => route('api.payment.cancel', ['invoice_id' => $invoice->id]),
            'returnUrl' => route('api.payment.success', ['invoice_id' => $invoice->id]),
        ];

        // Digest calculation
        ksort($params);
        $string = implode('', $params) . $config->config_data['shared_secret'];
        $params['digest'] = base64_encode(hash('sha256', $string, true));

        return view('payment.cardlink_form', [
            'apiUrl' => 'https://epay.cardlink.gr/checkout', 
            'params' => $params
        ]);
    }

    protected function getMerchantReturnUrl(Invoice $invoice, $status)
    {
        $merchant = $invoice->merchant;
        $payload = $invoice->payload ?? [];
        
        // 1. Check for custom redirect URLs in the payload (Phase 2.3)
        $baseUrl = null;
        if ($status === 'success') {
            $baseUrl = $payload['custom_success_url'] ?? null;
        } else {
            $baseUrl = $payload['custom_cancel_url'] ?? null;
        }

        // 2. Fallback to merchant webhook URL or a placeholder
        if (!$baseUrl) {
            $baseUrl = $merchant->webhook_url ?? 'https://demo.com/callback';
        }
        
        $params = [
            'order_id' => $invoice->external_order_id,
            'status' => $status,
            'hub_reference' => $invoice->id,
        ];

        // Sign the return URL so the merchant can verify it
        $params['signature'] = $this->signatureService->generate($params, $merchant->client_secret);

        return $baseUrl . (strpos($baseUrl, '?') !== false ? '&' : '?') . http_build_query($params);
    }
}
