<?php

// 1. Credentials from User
$clientId = 'hub_c825b76cbdd2f4f0';
$clientSecret = '4c2b9cd94a6f3712aa1c9824c69c56109df672bf316734ac9209d89eab0c4973';
$baseUrl = 'https://www.linkpaypro.online/api';

// 2. Data to send
$data = [
    'order_id' => 'TEST-' . time(),
    'amount' => 1.00,
    'currency' => 'USD',
    'customer_email' => 'test@example.com',
    'success_url' => 'https://example.com/success',
    'cancel_url' => 'https://example.com/cancel'
];

// 3. Generate Signature
ksort($data);
$dataString = http_build_query($data);
$signature = hash_hmac('sha256', $dataString, $clientSecret);

// 4. Perform Request
echo "Testing Merchant Integration...\n";
echo "Client ID: $clientId\n";
echo "Signature: $signature\n\n";

$ch = curl_init("$baseUrl/checkout/create");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    "X-Client-ID: $clientId",
    "X-Signature: $signature"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status: $httpCode\n";
echo "Response: $response\n";

if ($httpCode === 200) {
    $result = json_decode($response, true);
    if (isset($result['checkout_url'])) {
        echo "\n✅ SUCCESS! Checkout URL generated: " . $result['checkout_url'] . "\n";
    } else {
        echo "\n❌ FAILED! Unexpected response format.\n";
    }
} else {
    echo "\n❌ FAILED! Error in communication.\n";
}
