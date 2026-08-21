<?php
/**
 * Test script to simulate a Merchant Request to the Pay Hub (Root Domain).
 */

$hubUrl = 'http://localhost/api/checkout/create';
$clientId = 'hub_test_123';
$clientSecret = 'test_secret_789';

$data = [
    'client_id' => $clientId,
    'order_id' => 'TEST_ORDER_' . time(),
    'amount' => 49.99,
    'currency' => 'USD',
    'customer_email' => 'customer@example.com',
    'success_url' => 'http://localhost/demo/success',
    'cancel_url' => 'http://localhost/demo/cancel',
    'timestamp' => time(),
];

ksort($data);
$baseString = http_build_query($data);
$signature = hash_hmac('sha256', $baseString, $clientSecret);

echo "--- Simulating Merchant Request (ROOT) ---\n";
echo "URL: $hubUrl\n";
echo "Client ID: $clientId\n\n";

$ch = curl_init($hubUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-PayHub-Signature: ' . $signature
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status: $httpCode\n";
echo "Hub Response: $response\n";

if ($httpCode == 200) {
    $result = json_decode($response, true);
    if (isset($result['checkout_url'])) {
        echo "\nSUCCESS! You can open this URL in browser to test the UI:\n";
        echo $result['checkout_url'] . "\n";
    }
}
