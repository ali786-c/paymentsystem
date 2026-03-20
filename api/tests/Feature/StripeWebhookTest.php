<?php

namespace Tests\Feature;

use App\Models\Merchant;
use App\Models\Invoice;
use App\Models\GatewayConfig;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Bus;
use Tests\TestCase;

class StripeWebhookTest extends TestCase
{
    use RefreshDatabase;

    public function test_stripe_webhook_updates_invoice_status_via_metadata()
    {
        Bus::fake();

        // 1. Create a merchant
        $merchant = Merchant::create([
            'name' => 'Test Merchant',
            'client_id' => 'test_client',
            'client_secret' => 'test_secret',
            'webhook_url' => 'https://merchant.com/webhook'
        ]);

        // 2. Create gateway config for Stripe
        GatewayConfig::create([
            'merchant_id' => $merchant->id,
            'gateway_name' => 'stripe',
            'config_data' => ['secret_key' => 'sk_test_123', 'public_key' => 'pk_test_123'],
            'is_active' => true
        ]);

        // 3. Create an invoice
        $invoice = Invoice::create([
            'merchant_id' => $merchant->id,
            'external_order_id' => 'ORDER-123',
            'amount' => 100.00,
            'currency' => 'EUR',
            'status' => 'pending',
            'gateway_reference' => 'cs_test_session_id'
        ]);

        // 4. Simulate a Stripe Webhook (e.g., payment_intent.succeeded)
        // Note: StripeProvider has a 'evt_sim_' handler for local environment testing
        $payload = [
            'id' => 'evt_sim_test_webhook',
            'type' => 'payment_intent.succeeded',
            'data' => [
                'object' => [
                    'id' => 'pi_test_intent_id', // This DOES NOT match gateway_reference
                    'metadata' => [
                        'invoice_id' => $invoice->id, // This is how the new logic finds it
                        'external_order_id' => $invoice->external_order_id
                    ]
                ]
            ]
        ];

        $response = $this->postJson('/api/payment/webhook/stripe', $payload);

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        // 5. Verify invoice status was updated
        $invoice->refresh();
        $this->assertEquals('paid', $invoice->status);

        // 6. Verify merchant notification was dispatched
        Bus::assertDispatched(\App\Jobs\NotifyMerchantJob::class, function ($job) use ($invoice) {
            return $job->invoice->id === $invoice->id;
        });
    }
}
