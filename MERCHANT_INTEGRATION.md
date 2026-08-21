# 🚀 Pay Hub: Merchant Integration Guide

This guide explains how to connect any external website (e-commerce, SaaS, etc.) to the Pay Hub to accept payments.

---

## 1. Getting Your Credentials
Before you can start, you must be registered as a Merchant in the Pay Hub Admin Panel.

1.  Ask the Admin to create a Merchant account for your site.
2.  The Admin will provide you with:
    - **Client ID**: Your unique identifier.
    - **Client Secret**: Used to sign requests (KEEP THIS SECRET).
    -
---

## 2. Creating a Checkout Session
To start a payment, your website must send a `POST` request to the Hub's API.

**Endpoint:** `POST /api/checkout/create`  
**Headers:**
- `X-Client-ID`: Your Client ID
- `X-Signature`: A HMAC-SHA256 signature (see Authentication below)

**Request Body (JSON):**
```json
{
    "order_id": "ORD-12345",
    "amount": 99.99,
    "currency": "USD",
    "customer_email": "customer@example.com",
    "success_url": "https://yourstore.com/success",
    "cancel_url": "https://yourstore.com/cancel"
}
```

**Response:**
```json
{
    "success": true,
    "checkout_url": "https://demo.upgraderproxy.com/checkout/INV-ABC-123",
    "invoice_id": "INV-ABC-123"
}
```
**Action:** Redirect your customer to the `checkout_url` provided in the response.

---

## 3. Authentication (Security)
To prevent unauthorized requests, every API call must be signed.

### How to generate `X-Signature`:
1.  Take all parameters from your request body.
2.  Sort them alphabetically by key.
3.  Concatenate the values into a string.
4.  Apply HMAC-SHA256 using your `Client Secret`.

**PHP Example:**
```php
$params = ['order_id' => '123', 'amount' => 99.99, 'currency' => 'USD'];
ksort($params);
$dataString = http_build_query($params);
$signature = hash_hmac('sha256', $dataString, $YOUR_CLIENT_SECRET);
```

---

## 4. Receiving Payment Notifications (Webhooks)
When the customer finishes paying, the Hub will notify your server.

**Hub sends to your `Webhook URL`:** `POST /your-webhook-endpoint`  
**Payload:**
```json
{
    "order_id": "ORD-12345",
    "status": "paid",
    "hub_reference": "INV-ABC-123",
    "signature": "..."
}
```

### Verification:
You must verify the `signature` in the webhook payload using your `Client Secret` before updating the order status in your database.

---

## 5. Summary Flow
1.  **Merchant Site**: Calls Hub API with order details.
2.  **Hub**: Returns a secure `checkout_url`.
3.  **Merchant Site**: Redirects user to the `checkout_url`.
4.  **Customer**: Selects Stripe/Crypto/Cardlink and pays.
5.  **Hub**: Sends a "Paid" webhook to the Merchant Site.
6.  **Merchant Site**: Marks order as paid and delivers product.

---
*For support or technical queries, contact the System Administrator.*
