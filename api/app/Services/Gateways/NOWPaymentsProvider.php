<?php

namespace App\Services\Gateways;

use App\Contracts\PaymentProviderInterface;
use App\Models\Invoice;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NOWPaymentsProvider implements PaymentProviderInterface
{
    protected $apiUrl = 'https://api.nowpayments.io/v1';

    /**
     * Create a payment invoice on NOWPayments.
     */
    public function createInvoice(Invoice $invoice, array $config): string
    {
        $payload = [
            'price_amount' => (float) $invoice->amount,
            'price_currency' => strtolower($invoice->currency),
            'order_id' => (string) $invoice->id,
            'ipn_callback_url' => route('api.payment.webhook', ['provider' => 'nowpayments']),
            'success_url' => route('api.payment.success', ['invoice_id' => $invoice->id]),
            'cancel_url' => route('api.payment.cancel', ['invoice_id' => $invoice->id]),
        ];

        // Send request to NOWPayments
        $response = Http::withHeaders([
            'x-api-key' => $config['api_key'],
            'Content-Type' => 'application/json',
        ])->post("{$this->apiUrl}/invoice", $payload);

        if ($response->successful()) {
            $data = $response->json();
            
            // Save NOWPayments internal ID for reference
            $invoice->update(['gateway_reference' => $data['id'] ?? null]);
            
            return $data['invoice_url'];
        }

        Log::error("NOWPayments Create Invoice Error: " . $response->body());
        throw new \Exception("NOWPayments API Error: " . ($response->json('message') ?? $response->body()));
    }

    /**
     * Verify the high-security HMAC-SHA512 signature from NOWPayments IPN.
     */
    public function verifyWebhook(array $payload, array $config): array
    {
        $receivedSig = request()->header('x-nowpayments-sig');
        
        if (!$receivedSig) {
            Log::warning("NOWPayments Webhook: Missing x-nowpayments-sig header.");
            return ['success' => false];
        }

        // 1. Sort the payload keys alphabetically
        ksort($payload);

        // 2. Convert to JSON string with unescaped slashes (as per NOWPayments docs)
        $sortedPayloadJson = json_encode($payload, JSON_UNESCAPED_SLASHES);

        // 3. Calculate HMAC-SHA512 using the IPN Secret Key
        $ipnSecret = $config['ipn_secret'] ?? ''; // Merchant must configure this
        if (empty($ipnSecret)) {
            Log::error("NOWPayments Webhook: IPN Secret is not configured.");
            return ['success' => false];
        }

        $calculatedSig = hash_hmac('sha512', $sortedPayloadJson, $ipnSecret);

        // 4. Compare signatures securely
        if (!hash_equals($calculatedSig, $receivedSig)) {
            Log::warning("NOWPayments Webhook: Signature mismatch.", [
                'expected' => $calculatedSig,
                'received' => $receivedSig
            ]);
            return ['success' => false];
        }

        // 5. Map statuses
        // Possible statuses: waiting, confirming, confirmed, finished, failed, expired
        $status = $payload['payment_status'] ?? '';
        
        if ($status === 'finished') {
            return [
                'success' => true,
                'status' => 'paid',
                'reference' => $payload['payment_id'] ?? $payload['invoice_id'] ?? 'N/A',
                'external_order_id' => $payload['order_id'] ?? null,
            ];
        }

        if ($status === 'failed' || $status === 'expired') {
            return [
                'success' => false,
                'status' => $status,
                'message' => "Payment marked as {$status} by provider."
            ];
        }

        // Any other multi-step status (waiting, confirming) is considered "pending"
        return [
            'success' => false,
            'status' => 'pending',
            'message' => "Payment is currently in {$status} state."
        ];
    }

    public function getProviderName(): string
    {
        return 'nowpayments';
    }
}
