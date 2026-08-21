<?php

namespace Tests\Feature\Gateways;

use Tests\TestCase;
use App\Models\Invoice;
use App\Models\Merchant;
use App\Services\Gateways\NOWPaymentsProvider;
use Illuminate\Support\Facades\Http;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NOWPaymentsTest extends TestCase
{
    use RefreshDatabase;

    protected $provider;
    protected $merchant;
    protected $invoice;
    protected $config;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->provider = new NOWPaymentsProvider();
        
        $this->merchant = Merchant::create([
            'name' => 'Test Merchant',
            'client_id' => 'test_id',
            'client_secret' => 'test_secret',
        ]);

        $this->invoice = Invoice::create([
            'merchant_id' => $this->merchant->id,
            'external_order_id' => 'ORDER-123',
            'amount' => 100.00,
            'currency' => 'USD',
            'status' => 'pending',
        ]);

        $this->config = [
            'api_key' => 'fake_api_key',
            'ipn_secret' => 'fake_ipn_secret'
        ];
    }

    public function test_create_invoice_success()
    {
        Http::fake([
            'api.nowpayments.io/v1/invoice' => Http::response([
                'id' => 'NP_12345',
                'invoice_url' => 'https://nowpayments.io/payment/NP_12345'
            ], 200)
        ]);

        $url = $this->provider->createInvoice($this->invoice, $this->config);

        $this->assertEquals('https://nowpayments.io/payment/NP_12345', $url);
        $this->assertEquals('NP_12345', $this->invoice->fresh()->gateway_reference);
    }

    public function test_verify_webhook_signature_success()
    {
        $payload = [
            'payment_status' => 'finished',
            'payment_id' => 'PAID_123',
            'order_id' => (string) $this->invoice->id,
            'price_amount' => 100
        ];

        // Sort and hash manually for the test
        $data = $payload;
        ksort($data);
        $json = json_encode($data, JSON_UNESCAPED_SLASHES);
        $sig = hash_hmac('sha512', $json, $this->config['ipn_secret']);

        // Set the header in the request global (since verifyWebhook uses request()->header())
        request()->headers->set('x-nowpayments-sig', $sig);
        
        // Ensure request()->all() returns our payload
        request()->merge($payload);

        $result = $this->provider->verifyWebhook($payload, $this->config);

        $this->assertTrue($result['success']);
        $this->assertEquals('paid', $result['status']);
    }

    public function test_verify_webhook_signature_failure()
    {
        $payload = ['payment_status' => 'finished'];
        
        request()->headers->set('x-nowpayments-sig', 'wrong_signature');
        request()->merge($payload);

        $result = $this->provider->verifyWebhook($payload, $this->config);

        $this->assertFalse($result['success']);
    }
}
