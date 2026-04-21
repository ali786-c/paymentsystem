<?php
// C:\Users\Muhammad Aliyan\Desktop\upgradercx-full-project\upgradercx-full-project\upgrader-pay-hub\api\simulate_webhook.php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// --- CONFIGURATION ---
// Change this to the ID of an invoice that is currently 'pending' in your database
$invoiceIdToTest = 179; 

// We need to fetch the invoice to know which merchant it belongs to
$invoice = \App\Models\Invoice::find($invoiceIdToTest);

if (!$invoice) {
    die("Error: Invoice #{$invoiceIdToTest} not found in database.\n");
}

$merchantId = $invoice->merchant_id;

// Fetch the NOWPayments config for this merchant
$config = \App\Models\GatewayConfig::where('gateway_name', 'nowpayments')
    ->where(function($query) use ($merchantId) {
        $query->where('merchant_id', $merchantId)
              ->orWhereNull('merchant_id'); // Global fallback
    })
    ->orderBy('merchant_id', 'desc')
    ->first();

if (!$config) {
    die("Error: NOWPayments is not configured for Merchant #{$merchantId}\n");
}

$ipnSecret = trim($config->config_data['ipn_secret'] ?? '');

if (empty($ipnSecret)) {
    die("Error: IPN Secret is empty in the database.\n");
}

// Build the mock payload as if NOWPayments sent it
$payload = [
    "actually_paid" => 5.0974077,
    "actually_paid_at_fiat" => 0,
    "fee" => [
        "currency" => "ltc",
        "depositFee" => 0.000651,
        "serviceFee" => 0.000914,
        "withdrawalFee" => 0
    ],
    "invoice_id" => 5308355567, 
    "order_description" => null,
    "order_id" => (string) $invoiceIdToTest, // Hub Invoice ID
    "outcome_amount" => 0.09045838,
    "outcome_currency" => "ltc",
    "parent_payment_id" => null,
    "pay_address" => "0x3c81C96E8007934419b723847B40879caf43517c",
    "pay_amount" => 5.0974077,
    "pay_currency" => "usdtbsc",
    "payin_extra_id" => null,
    "payment_extra_ids" => null,
    "payment_id" => 4778277515,
    "payment_status" => "finished", // "finished" marks it as paid!
    "price_amount" => (float) $invoice->amount,
    "price_currency" => strtolower($invoice->currency),
    "purchase_id" => "5476644975",
    "updated_at" => time() * 1000
];

// Generate the exact signature
ksort($payload);
$jsonPayload = json_encode($payload, JSON_UNESCAPED_SLASHES);
$signature = hash_hmac('sha512', $jsonPayload, $ipnSecret);

// Identify the webhook URL using the actual domain you provided
$webhookUrl = 'https://www.linkpaypro.online/api/payment/webhook/nowpayments';
echo "Sending Webhook to: {$webhookUrl}\n";
echo "Using IPN Secret length: " . strlen($ipnSecret) . "\n\n";

// Fire the Webhook Request!
$ch = curl_init($webhookUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonPayload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-nowpayments-sig: ' . $signature
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "--- RESULTS ---\n";
echo "HTTP Status Code: {$httpCode}\n";
echo "Response Body: {$response}\n\n";
echo "Check your laravel.log file to see if the signature mismatch error is gone!\n";
