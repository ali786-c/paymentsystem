<?php

/**
 * TEST SCRIPT: Verify Stripe Card Detail Capture
 * 
 * This script simulates a Stripe webhook arrival to verify that the
 * Hub correctly extracts and stores card_last4 and card_brand.
 */

// 1. Manually include Laravel's Autoloader and Bootstrap to use Models
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "Database Path: " . config('database.connections.sqlite.database') . "\n";
echo "Active DB Connection: " . DB::connection()->getDatabaseName() . "\n";

use App\Models\Invoice;
use App\Models\Merchant;
use App\Models\GatewayConfig;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

echo "--- STARTING CAPTURE TEST ---\n";

// 2. Find or Create a Test Merchant
$merchant = Merchant::first() ?: Merchant::create([
    'name' => 'Test Store',
    'client_id' => 'test_' . bin2hex(random_bytes(4)),
    'client_secret' => bin2hex(random_bytes(16)),
]);

// 3. Ensure Stripe Config Exists
GatewayConfig::updateOrCreate(
    ['merchant_id' => $merchant->id, 'gateway_name' => 'stripe'],
    ['config_data' => ['secret_key' => 'sk_test_mock', 'webhook_secret' => 'whsec_mock'], 'is_active' => true]
);

// 4. Create a Pending Invoice
$invoice = Invoice::create([
    'merchant_id' => $merchant->id,
    'amount' => 10.00,
    'currency' => 'USD',
    'external_order_id' => 'ORD-' . time(),
    'status' => 'pending',
    'payment_method' => 'stripe',
]);

echo "Created Test Invoice: #{$invoice->id} (Status: {$invoice->status})\n";

// 5. Build Mock Webhook Payload
// Using evt_sim_ prefix to trigger the mock logic we just added to StripeProvider
$payload = [
    'id' => 'evt_sim_' . bin2hex(random_bytes(4)),
    'type' => 'checkout.session.completed',
    'data' => [
        'object' => [
            'id' => 'cs_test_' . bin2hex(random_bytes(4)),
            'metadata' => [
                'invoice_id' => $invoice->id
            ]
        ]
    ]
];

echo "Simulating Webhook for Event: {$payload['id']}...\n";

// 6. Direct Call to the Webhook Handler (Internal Simulation)
try {
    // Correctly create the request with the payload in the parameters
    $request = Illuminate\Http\Request::create(
        "/api/payment/webhook/stripe", // Correct URL structure based on api.php
        'POST',
        $payload
    );
    
    // Set the request instance in the container
    app()->instance('request', $request);

    $controller = app(App\Http\Controllers\PaymentController::class);
    $response = $controller->webhook($request, 'stripe');
    
    echo "Webhook Response: " . $response->getStatusCode() . " " . $response->getContent() . "\n";
} catch (\Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}

// 7. Verification - Check if Database was updated
$invoice->refresh();

echo "\n--- VERIFICATION RESULTS ---\n";
echo "Final Invoice Status: " . $invoice->status . "\n";
echo "Card Brand: " . ($invoice->card_brand ?: 'MISSING') . "\n";
echo "Card Last 4: " . ($invoice->card_last4 ?: 'MISSING') . "\n";

if ($invoice->card_brand === 'visa' && $invoice->card_last4 === '4242') {
    echo "\n✅ SUCCESS: Card details captured correctly!\n";
} else {
    echo "\n❌ FAILURE: Card details were not captured.\n";
}

echo "---------------------------\n";
