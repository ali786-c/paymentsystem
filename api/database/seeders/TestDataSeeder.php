<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Merchant;
use App\Models\Invoice;
use App\Models\GatewayConfig;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $merchant = Merchant::create([
            'name' => 'Test Merchant Store',
            'client_id' => 'hub_test_123',
            'client_secret' => 'test_secret_789',
            'webhook_url' => 'https://example.com/webhook',
            'branding_settings' => [
                'primary_color' => '#3b82f6',
                'logo_url' => 'https://via.placeholder.com/150'
            ]
        ]);

        Invoice::create([
            'merchant_id' => $merchant->id,
            'external_order_id' => 'TRX-999',
            'amount' => 150.00,
            'currency' => 'USD',
            'status' => 'pending',
            'payment_method' => null,
            'payload' => [
                'customer_email' => 'customer@example.com',
                'items' => [
                    ['name' => 'Premium Plan', 'price' => 150.00]
                ]
            ]
        ]);

        // Add Gateway Configuration
        GatewayConfig::create([
            'merchant_id' => null, // Global default
            'gateway_name' => 'stripe',
            'config_data' => [
                'secret_key' => 'sk_test_mock_123',
                'webhook_secret' => 'whsec_test_mock_456'
            ]
        ]);
        
        GatewayConfig::create([
            'merchant_id' => null, // Global default
            'gateway_name' => 'cryptomus',
            'config_data' => [
                'merchant_id' => 'crypto_test_123',
                'api_key' => 'crypto_key_456'
            ]
        ]);
    }
}
