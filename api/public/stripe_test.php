<?php
// stripe_test.php - Save this to public/stripe_test.php on the server
$ch = curl_init("https://api.stripe.com/v1/events");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($ch);
$info = curl_getinfo($ch);
$error = curl_error($ch);
curl_close($ch);

echo "HTTP Code: " . $info['http_code'] . "\n";
if ($error) echo "CURL Error: " . $error . "\n";
echo "Response excerpt: " . substr($response, 0, 100) . "\n";
