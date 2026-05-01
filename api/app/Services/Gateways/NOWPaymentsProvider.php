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

        // 1. Get raw JSON to avoid Laravel middleware side-effects
        $requestJson = request()->getContent();
        $requestData = json_decode($requestJson, true);
        
        if (!is_array($requestData)) {
            $requestData = $payload; // Fallback
        }

        // 2. Recursive Sort (As per NOWPayments Official Docs)
        $this->recursiveKsort($requestData);

        // 3. Convert to JSON string with unescaped slashes (as per NOWPayments docs)
        $sortedPayloadJson = json_encode($requestData, JSON_UNESCAPED_SLASHES);

        // 4. Calculate HMAC-SHA512 using the IPN Secret Key
        $ipnSecret = trim($config['ipn_secret'] ?? ''); 
        if (empty($ipnSecret)) {
            Log::error("NOWPayments Webhook: IPN Secret is not configured.");
            return ['success' => false];
        }

        $calculatedSig = hash_hmac('sha512', $sortedPayloadJson, $ipnSecret);

        // 5. Compare signatures securely
        if (!hash_equals($calculatedSig, $receivedSig)) {
            Log::warning("NOWPayments Webhook: Signature mismatch.", [
                'expected' => $calculatedSig,
                'received' => $receivedSig,
                'json_payload' => $sortedPayloadJson
            ]);
            return ['success' => false];
        }

        // 6. Map statuses
        $status = $requestData['payment_status'] ?? '';
        
        if ($status === 'finished') {
            return [
                'success' => true,
                'status' => 'paid',
                'reference' => $requestData['payment_id'] ?? $requestData['invoice_id'] ?? 'N/A',
                'external_order_id' => $requestData['order_id'] ?? null,
            ];
        }

        if ($status === 'failed' || $status === 'expired') {
            return [
                'success' => false,
                'status' => $status,
                'message' => "Payment marked as {$status} by provider."
            ];
        }

        return [
            'success' => false,
            'status' => 'pending',
            'message' => "Payment is currently in {$status} state."
        ];
    }

    /**
     * Sort array keys recursively to match NOWPayments signature logic.
     */
    private function recursiveKsort(&$array)
    {
        ksort($array);
        foreach ($array as &$value) {
            if (is_array($value)) {
                $this->recursiveKsort($value);
            }
        }
    }

    public function getProviderName(): string
    {
        return 'nowpayments';
    }
}
