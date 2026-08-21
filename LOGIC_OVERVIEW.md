# Upgrader Pay Hub - Logic & Architecture Overview

This document explains how the internal systems of the Upgrader Pay Hub work together to process payments and manage configurations.

## 🏛️ System Architecture
The application follows a decoupled **Client-Server** architecture:
- **Frontend (React + Vite)**: A Single Page Application (SPA) that communicates with the backend via REST APIs.
- **Backend (Laravel API)**: A stateless API server that handles business logic, database interactions, and third-party gateway integrations.

---

## 💳 Core Payment Flow
How a transaction moves through the system:

1. **Invoice Generation**: 
   - A merchant's website sends a request to the Pay Hub API to create an invoice. 
   - The system generates a unique `invoiceId` and returns a checkout URL.

2. **Checkout Page (`/checkout/:invoiceId`)**:
   - The user (payer) lands on the checkout page.
   - The frontend fetches the invoice details and the available payment gateways for that specific merchant.

3. **Gateway Triggering**:
   - When the user selects a gateway (e.g., Stripe) and clicks "Complete Payment":
   - The frontend calls the backend `process` endpoint.
   - The backend `PaymentService` fetches the correct credentials (API keys) and initializes the session with the provider.
   - The user is redirected to the provider's secure payment page.

---

## ⚙️ Gateway Configuration Logic (The "Priority" System)
One of the most important features of the hub is how it decides which API keys to use:

1. **Merchant-Specific Settings**: When an invoice is processed, the system first looks for "Merchant Configs" linked to that specific merchant's ID.
2. **Global Defaults (The Fallback)**: If a merchant hasn't configured their own keys, the system falls back to the **Hub Defaults**. 
   - *Logic*: `AdminController` checks if `merchant_id` is matched. If no match is found, it queries for `merchant_id = NULL` (Global).
   - This ensures that a merchant can go live immediately using the hub's own accounts if needed.

---

## 🔒 Security & Authentication
- **Admin Panel**: Protected by **Laravel Sanctum**. Every request to the `/admin` routes must include a Bearer Token.
- **Data Protection**: Sensitive keys (Secret Keys, Webhook Secrets) are stored securely in the database and are never exposed to the public frontend.
- **Checkout Security**: The checkout page uses one-time invoice IDs and doesn't require admin authentication, making it safe for public use while keeping the admin area isolated.

---

## 📂 Data Model
- **Merchants**: Entities that represent a website/client using the hub.
- **Invoices**: Individual payment requests with amounts, currencies, and statuses.
- **GatewayConfigs**: Stores API keys and enabled/disabled states for Stripe, Cryptomus, etc.

---
*Created: March 18, 2026*
