<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Invoice;
use App\Models\Merchant;
use Illuminate\Support\Facades\Http;
use App\Services\SignatureService;

// Get the latest paid invoice to test with
$invoice = Invoice::where('status', 'paid')->latest()->first();

if (!$invoice) {
    echo "No paid invoice found to test with.\n";
    exit;
}

$merchant = $invoice->merchant;

if (!$merchant || !$merchant->webhook_url) {
    echo "Merchant has no webhook URL.\n";
    exit;
}

echo "Testing Webhook for Merchant: {$merchant->name}\n";
echo "Webhook URL: {$merchant->webhook_url}\n";
echo "Invoice Hub ID: {$invoice->id}\n";
echo "External Order ID: {$invoice->external_order_id}\n";

$signatureService = app(SignatureService::class);

$payload = [
    'order_id' => $invoice->external_order_id,
    'status' => $invoice->status,
    'amount' => $invoice->amount,
    'currency' => $invoice->currency,
    'hub_reference' => $invoice->id,
    'payment_method' => $invoice->payment_method,
    'card_last4' => $invoice->card_last4,
    'card_brand' => $invoice->card_brand,
    'card_holder_name' => $invoice->card_holder_name,
    'timestamp' => $invoice->paid_at ? $invoice->paid_at->toIso8601String() : now()->toIso8601String(),
];

// Sign the payload using the merchant's client_secret
$payload['signature'] = $signatureService->generate($payload, $merchant->client_secret);

echo "\n--- Sending Payload ---\n";
print_r($payload);

try {
    $response = Http::timeout(10)
        ->withHeaders([
            'X-PayHub-Signature' => $payload['signature'],
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ])
        ->post($merchant->webhook_url, $payload);

    echo "\n--- Response from Merchant SaaS ---\n";
    echo "Status Code: " . $response->status() . "\n";
    echo "Body: \n" . $response->body() . "\n";
    
} catch (\Exception $e) {
    echo "\n--- Request Failed ---\n";
    echo $e->getMessage() . "\n";
}
