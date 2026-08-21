# External Website Integration Guide - Upgrader Pay Hub

This guide explains how to connect any external website (PHP, Node.js, Python, etc.) to the Upgrader Pay Hub to process payments.

## 1. Authentication Credentials
Request these from your Pay Hub administrator:
- **Client ID**: Your unique merchant identifier.
## 🗝️ API Credentials

To link your external website, you need two keys from your Merchant Dashboard:
1.  **Integration ID** (e.g., `hub_...`): This is your `client_id`.
2.  **API Secret** (e.g., `a1b2...`): This is your `client_secret`. 

> [!IMPORTANT]
> You can now find both of these in the **Merchant Network** tab. Use the 👁️ icon to reveal the secret and the 📋 icon to copy them.

---

## 2. The Integration Workflow
1. **Request Checkout**: Your server sends order details to Pay Hub.
2. **Signature**: You sign the request using your Client Secret.
3. **Redirect**: Pay Hub returns a `checkout_url`. You redirect the user there.
4. **Callback**: Pay Hub notifies your `success_url` or `webhook_url` once paid.

---

## 3. Creating a Checkout Session (API)
## 🛠️ Step 1: Create a Payment Session
On your website's backend, send a POST request to create an invoice.

**Endpoint:** `http://your-domain.com/api/payment/create`
**Method:** `POST`

### Request Headers
```http
Content-Type: application/json
```

### Request Body (JSON)
| Field | Type | Description |
| :--- | :--- | :--- |
| `client_id` | string | Your **Integration ID** from the dashboard |
| `client_secret` | string | Your **API Secret** from the dashboard |
| `amount` | float | Total amount to charge (e.g., `150.00`) |
| `currency` | string | Currency code (e.g., `USD`, `PKR`, `EUR`) |
| `order_id` | string | Your website's internal order reference (e.g., `ORD-123`) |
| `customer_email` | string | (Optional) Customer's email address |
| `success_url` | string | URL to redirect after successful payment |
| `cancel_url` | string | URL to redirect if payment is cancelled |
| `webhook_url` | string | (Optional) URL for payment status notifications |
```json
{
    "order_id": "ORD-12345",
    "amount": 49.99,
    "currency": "USD",
    "customer_email": "customer@example.com",
    "success_url": "https://your-site.com/success",
    "cancel_url": "https://your-site.com/cancel"
}
```

---

## 4. Code Examples

### 🐘 PHP Implementation
```php
<?php
$clientId = 'YOUR_CLIENT_ID';
$clientSecret = 'YOUR_CLIENT_SECRET';
$apiUrl = 'https://your-pay-hub.com/api/checkout/create';

$data = [
    'order_id' => 'ORD-' . time(),
    'amount' => 50.00,
    'currency' => 'USD',
    'customer_email' => 'user@example.com',
    'success_url' => 'https://your-site.com/success',
    'cancel_url' => 'https://your-site.com/cancel'
];

// 1. Sort data alphabetically
ksort($data);

// 2. Generate Signature
$baseString = http_build_query($data);
$signature = hash_hmac('sha256', $baseString, $clientSecret);

// 3. Send Request
$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-PayHub-Client-ID: ' . $clientId,
    'X-PayHub-Signature: ' . $signature
]);

$response = json_decode(curl_exec($ch), true);
curl_close($ch);

if ($response['success']) {
    // Redirect User to Pay Hub Checkout
    header('Location: ' . $response['checkout_url']);
} else {
    echo "Error: " . $response['message'];
}
?>
```

---

## 🛰️ Step 2: Handle Webhooks (Server Notification)
While `success_url` redirects the customer, a **Webhook** is a server-to-server notification that ensures your database is updated even if the user closes their browser.

### Webhook Payload (POST)
Pay Hub will send a JSON POST request to your configured **Webhook URL**:

```json
{
    "order_id": "ORD-12345",
    "status": "paid",
    "amount": 49.99,
    "currency": "USD",
    "hub_reference": "102",
    "payment_method": "stripe",
    "timestamp": "2026-03-18T11:00:00Z",
    "signature": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
}
```

### Signature Verification
To ensure the request came from Pay Hub:
1.  Remove the `signature` field from the data.
2.  Sort the remaining fields alphabetically by key.
3.  Generate an HMAC-SHA256 hash using your `API Secret`.
4.  Compare it with the provided `signature`.

---

## 5. Security Checklist
- [ ] **Never** expose your `API Secret` in frontend JavaScript.
- [ ] **Always** verify the `signature` on incoming webhooks.
- [ ] Use **HTTPS** for your Webhook endpoint to protect data.
- [ ] Whitelist Pay Hub's IP address (if applicable).

---
*Documentation Created: March 18, 2026*
