<?php

namespace App\Services\Gateways;

use App\Contracts\PaymentProviderInterface;
use App\Models\Invoice;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CryptomusProvider implements PaymentProviderInterface
{
    protected $apiUrl = 'https://api.cryptomus.com/v1/payment';

    public function createInvoice(Invoice $invoice, array $config): string
    {
        $payload = [
            'amount' => (string) $invoice->amount,
            'currency' => strtoupper($invoice->currency),
            'order_id' => (string) $invoice->id,
            'url_callback' => route('api.payment.webhook', ['provider' => 'cryptomus']),
            'url_return' => route('api.payment.success', ['invoice_id' => $invoice->id]),
            'is_auto_withdrawal' => false,
        ];

        $sign = $this->generateSignature(json_encode($payload), $config['api_key']);

        $response = Http::withHeaders([
            'merchant' => $config['merchant_id'],
            'sign' => $sign,
            'Content-Type' => 'application/json',
        ])->post($this->apiUrl, $payload);

        if ($response->successful()) {
            $data = $response->json();
            $invoice->update(['gateway_reference' => $data['result']['uuid'] ?? null]);
            return $data['result']['url'];
        }

        Log::error("Cryptomus Secret Error: " . $response->body());
        throw new \Exception("Cryptomus API Error: " . $response->json('message'));
    }

    public function verifyWebhook(array $payload, array $config): array
    {
        // Extract sign from payload (it's often sent in the body or header)
        $receivedSign = $payload['sign'] ?? '';
        unset($payload['sign']);

        // Cryptomus sign verification
        // Logic: sign = md5(base64_encode(json_encode($payload)) . $apiKey)
        $calculatedSign = $this->generateSignature(json_encode($payload), $config['api_key']);

        if ($receivedSign !== $calculatedSign) {
            \Log::warning("Cryptomus Signature Mismatch");
            return ['success' => false];
        }

        if ($payload['status'] === 'paid' || $payload['status'] === 'paid_over') {
            return [
                'success' => true,
                'status' => 'paid',
                'reference' => $payload['uuid'],
                'external_order_id' => $payload['order_id'],
            ];
        }

        return ['success' => false];
    }

    protected function generateSignature(string $jsonPayload, string $apiKey): string
    {
        return md5(base64_encode($jsonPayload) . $apiKey);
    }

    public function getProviderName(): string
    {
        return 'cryptomus';
    }
}
