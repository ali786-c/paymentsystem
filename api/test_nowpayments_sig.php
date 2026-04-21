<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$payload = [
    "actually_paid" => 0,
    "actually_paid_at_fiat" => 0,
    "fee" => [
        "currency" => "ltc",
        "depositFee" => 0,
        "serviceFee" => 0,
        "withdrawalFee" => 0
    ],
    "invoice_id" => 5308355567,
    "order_description" => null,
    "order_id" => "179",
    "outcome_amount" => 0.0905566,
    "outcome_currency" => "ltc",
    "parent_payment_id" => null,
    "pay_address" => "0x3c81C96E8007934419b723847B40879caf43517c",
    "pay_amount" => 5.0974077,
    "pay_currency" => "usdtbsc",
    "payin_extra_id" => null,
    "payment_extra_ids" => null,
    "payment_id" => 4778277515,
    "payment_status" => "waiting",
    "price_amount" => 4.33,
    "price_currency" => "eur",
    "purchase_id" => "5476644975",
    "updated_at" => 1776759321016
];

$config = \App\Models\GatewayConfig::where('gateway_name', 'nowpayments')->where('merchant_id', 5)->first();
$ipnSecret = $config->config_data['ipn_secret'] ?? '';
echo "IPN Secret Length: " . strlen($ipnSecret) . "\n";

ksort($payload);
$json = json_encode($payload, JSON_UNESCAPED_SLASHES);
echo "JSON:\n" . $json . "\n";
$sig = hash_hmac('sha512', $json, $ipnSecret);
echo "CALCULATED: " . $sig . "\n";
echo "EXPECTED:   96e87358941ed88b9abb5ccf447c26196a79a994512589e6e83a2f0dd9abc39375bb3a644f03e57639acf4bad471f808978f6d0f94f0be64339cd0afda945775\n";

$json_unicode = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
$sig2 = hash_hmac('sha512', $json_unicode, $ipnSecret);
echo "CALCULATED2: " . $sig2 . "\n";
