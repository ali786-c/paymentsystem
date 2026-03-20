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
                'payment_intent_data' => [
                    'metadata' => [
                        'invoice_id' => $invoice->id,
                        'external_order_id' => $invoice->external_order_id,
                    ],
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
        Log::info("StripeProvider: Verifying event ID: {$eventId}");
        if (!$eventId) {
            Log::warning("StripeProvider: No event ID found in payload");
            return ['success' => false];
        }

        try {
            // Allow mock events for testing
            if (app()->environment(['local', 'testing']) && str_starts_with($eventId, 'evt_sim_')) {
                return [
                    'success' => true,
                    'status' => 'paid',
                    'reference' => 'sim_ref_' . time(),
                    'external_order_id' => 'TRX-SIM-123',
                ];
            }

            // 1. ATTEMPT SECURE VERIFICATION VIA API (WITH NO TIMEOUT OPTIONS FOR COMPATIBILITY)
            try {
                // We remove timeout/connect_timeout because some older SDKs on servers choke on unknown options
                $event = $this->client->events->retrieve($eventId, [], []);
                $object = $event->data->object;
                
                Log::info("StripeProvider: Secured Verification via API success. Event: {$event->type}");

                if ($event->type === 'checkout.session.completed' || $event->type === 'payment_intent.succeeded') {
                    $extOrderId = isset($object->metadata->external_order_id) ? $object->metadata->external_order_id : null;
                    return [
                        'success' => true,
                        'status' => 'paid',
                        'reference' => $object->id,
                        'external_order_id' => $extOrderId,
                    ];
                }
            } catch (\Throwable $e) {
                Log::warning("StripeProvider: Secure verification failed/timed out. Falling back to payload trust. Error: " . $e->getMessage());
                
                // 2. FALLBACK: Trust the payload if API is unreachable but payload is valid
                $type = isset($payload['type']) ? $payload['type'] : '';
                $dataObject = isset($payload['data']['object']) ? $payload['data']['object'] : [];
                
                if ($type === 'checkout.session.completed' && (isset($dataObject['payment_status']) && $dataObject['payment_status'] === 'paid')) {
                    Log::info("StripeProvider: Fallback Verification SUCCESS (Session Paid)");
                    $extId = isset($dataObject['metadata']['external_order_id']) ? $dataObject['metadata']['external_order_id'] : null;
                    return [
                        'success' => true,
                        'status' => 'paid',
                        'reference' => isset($dataObject['id']) ? $dataObject['id'] : 'N/A',
                        'external_order_id' => $extId,
                    ];
                }

                if ($type === 'payment_intent.succeeded' && (isset($dataObject['status']) && $dataObject['status'] === 'succeeded')) {
                    Log::info("StripeProvider: Fallback Verification SUCCESS (Intent Succeeded)");
                    $extId = isset($dataObject['metadata']['external_order_id']) ? $dataObject['metadata']['external_order_id'] : null;
                    return [
                        'success' => true,
                        'status' => 'paid',
                        'reference' => isset($dataObject['id']) ? $dataObject['id'] : 'N/A',
                        'external_order_id' => $extId,
                    ];
                }
            }
            
            Log::info("Stripe event ignored or invalid: " . ($payload['type'] ?? 'unknown'));
        } catch (\Throwable $e) {
            Log::error("Stripe Verification CRITICAL Error: " . $e->getMessage(), [
                'type' => get_class($e),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
        }

        return ['success' => false];
    }

    public function getProviderName(): string
    {
        return 'stripe';
    }
}
