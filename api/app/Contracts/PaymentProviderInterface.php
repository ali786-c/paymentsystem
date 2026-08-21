<?php

namespace App\Contracts;

use App\Models\Invoice;

interface PaymentProviderInterface
{
    /**
     * Create a payment session/invoice with the provider.
     * Returns the redirect URL for the customer.
     */
    public function createInvoice(Invoice $invoice, array $config): string;

    /**
     * Verify the webhook/callback payload from the provider.
     * Returns boolean success status and normalized payment details.
     */
    public function verifyWebhook(array $payload, array $config): array;

    /**
     * Get the provider's unique identifier (e.g., 'stripe').
     */
    public function getProviderName(): string;
}
