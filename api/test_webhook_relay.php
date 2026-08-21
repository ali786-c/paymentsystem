<?php
/**
 * Test script to simulate a Gateway Webhook to the Pay Hub.
 */

$hubWebhookUrl = "http://localhost/api/payment/webhook/stripe";

// Correct Stripe-style event payload
$payload = [
    'id' => 'evt_sim_999', // Matches our StripeProvider bypass
    'type' => 'checkout.session.completed',
    'data' => [
        'object' => [
            'id' => 'evt_sim_999',
            'status' => 'succeeded',
            'metadata' => [
                'external_order_id' => 'TRX-999'
            ]
        ]
    ]
];

echo "--- Simulating Gateway Webhook (ROOT) ---\n";
echo "URL: $hubWebhookUrl\n";

$ch = curl_init($hubWebhookUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status: $httpCode\n";
echo "Hub Response: $response\n";
