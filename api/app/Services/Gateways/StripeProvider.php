<?php

namespace App\Services\Gateways;

use App\Contracts\PaymentProviderInterface;
use App\Models\Invoice;
use Stripe\StripeClient;
use Stripe\Exception\ApiErrorException;
use Illuminate\Support\Facades\Log;

class StripeProvider implements PaymentProviderInterface
{
    protected $client;

    public function createInvoice(Invoice $invoice, array $config): string
    {
        $this->client = new StripeClient($config['secret_key']);

        try {
            $session = $this->client->checkout->sessions->create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => strtolower($invoice->currency),
                        'product_data' => [
                            'name' => "Order #{$invoice->external_order_id}",
                        ],
                        'unit_amount' => (int)($invoice->amount * 100), // Stripe uses cents
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('api.payment.success', ['invoice_id' => $invoice->id]),
                'cancel_url' => route('api.payment.cancel', ['invoice_id' => $invoice->id]),
                'metadata' => [
                    'invoice_id' => $invoice->id,
                    'external_order_id' => $invoice->external_order_id,
                ],
            ]);

            // Save the stripe session ID for later verification
            $invoice->update(['gateway_reference' => $session->id]);

            return $session->url;
        } catch (ApiErrorException $e) {
            \Log::error("Stripe Session Error: " . $e->getMessage());
            throw $e;
        }
    }

    public function verifyWebhook(array $payload, array $config): array
    {
        // Stripe webhooks should be verified using the signature, 
        // but for the basic driver logic, we extract the basics.
        // Direct API verification using the ID is safer
        
        $this->client = new StripeClient($config['secret_key']);
        
        $eventId = $payload['id'] ?? null;
        if (!$eventId) return ['success' => false];

        try {
            // Allow mock events for Phase 5 testing in local environment
            if (app()->environment(['local', 'testing']) && str_starts_with($eventId, 'evt_sim_')) {
                return [
                    'success' => true,
                    'status' => 'paid',
                    'reference' => 'sim_ref_' . time(),
                    'external_order_id' => 'TRX-SIM-123',
                ];
            }

            $event = $this->client->events->retrieve($eventId);
            $object = $event->data->object;

            if ($event->type === 'checkout.session.completed' || $event->type === 'payment_intent.succeeded') {
                return [
                    'success' => true,
                    'status' => 'paid',
                    'reference' => $object->id,
                    'external_order_id' => $object->metadata->external_order_id ?? null,
                ];
            }
            
            Log::info("Stripe event ignored: {$event->type}");
        } catch (\Exception $e) {
            Log::error("Stripe Verification Error: " . $e->getMessage());
        }

        return ['success' => false];
    }

    public function getProviderName(): string
    {
        return 'stripe';
    }
}
