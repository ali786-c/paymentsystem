<?php

namespace App\Services\Gateways;

use App\Contracts\PaymentProviderInterface;
use App\Models\Invoice;
use Illuminate\Support\Facades\Log;

class CardlinkProvider implements PaymentProviderInterface
{
    // Note: Cardlink production URL is usually provided in their portal
    protected $apiUrl = 'https://epay.cardlink.gr/checkout'; 

    public function createInvoice(Invoice $invoice, array $config): string
    {
        // Cardlink logic usually involves forming a POST form 
        // But for our Hub, we will provide a redirect URL that includes the parameters
        
        $params = [
            'mid' => $config['mid'],
            'orderid' => $invoice->id,
            'orderDesc' => "Order #{$invoice->external_order_id}",
            'orderAmount' => $invoice->amount,
            'currency' => strtoupper($invoice->currency),
            'payerEmail' => $invoice->merchant->webhook_url, // Fallback
            'trType' => '1', // Sale
            'confirmUrl' => route('api.payment.webhook', ['provider' => 'cardlink']),
            'cancelUrl' => route('api.payment.cancel', ['invoice_id' => $invoice->id]),
            'returnUrl' => route('api.payment.success', ['invoice_id' => $invoice->id]),
        ];

        // Digest calculation: digest = base64(sha256(concat(params) + sharedSecret))
        $params['digest'] = $this->calculateDigest($params, $config['shared_secret']);

        // Since Cardlink expects a POST request, we can either:
        // 1. Submit a hidden form via the frontend (preferred for redirection)
        // 2. Or return a Hub URL that renders a self-submitting form.
        
        // For simplicity in the interface, we return a special Hub route that will render the form
        return route('api.payment.cardlink.form', ['invoice_id' => $invoice->id]);
    }

    public function verifyWebhook(array $payload, array $config): array
    {
        $receivedDigest = $payload['digest'] ?? '';
        unset($payload['digest']);

        $calculatedDigest = $this->calculateDigest($payload, $config['shared_secret']);

        if ($receivedDigest !== $calculatedDigest) {
            Log::warning("Cardlink Digest Mismatch");
            return ['success' => false];
        }

        if ($payload['status'] === 'CAPTURED') {
            return [
                'success' => true,
                'status' => 'paid',
                'reference' => $payload['txId'] ?? $payload['orderid'],
                'external_order_id' => $payload['orderid'],
            ];
        }

        return ['success' => false];
    }

    protected function calculateDigest(array $params, string $sharedSecret): string
    {
        // Cardlink digest logic: parameters in specific order + shared secret
        ksort($params);
        $string = implode('', $params) . $sharedSecret;
        return base64_encode(hash('sha256', $string, true));
    }

    public function getProviderName(): string
    {
        return 'cardlink';
    }
}
