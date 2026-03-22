<?php

use App\Models\GatewayConfig;
use Illuminate\Support\Facades\Artisan;

// 1. Boot Laravel
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

echo "<h1>Setting up Gateway Configurations...</h1>";

try {
    // 2. Clear Caches First
    echo "<p>Clearing caches...</p>";
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('cache:clear');

    // 3. Define Configurations
    $configs = [
        [
            'gateway_name' => 'nowpayments',
            'config_data' => [
                'api_key' => 'DGC2SRC-JS4MBSC-JW2ZS8S-62XRXFZ',
                'ipn_secret' => '6gsaGHY/svNwiG1+oJzhpfkHT7SXkfyf'
            ]
        ],
        [
            'gateway_name' => 'stripe',
            'config_data' => [
                'publishable_key' => '',
                'secret_key' => '',
                'webhook_secret' => ''
            ]
        ],
        [
            'gateway_name' => 'cardlink',
            'config_data' => [
                'mid' => '',
                'shared_secret' => ''
            ]
        ]
    ];

    // 4. Update Database
    foreach ($configs as $config) {
        GatewayConfig::updateOrCreate(
            ['merchant_id' => null, 'gateway_name' => $config['gateway_name']],
            ['config_data' => $config['config_data'], 'is_active' => true]
        );
        echo "<p>Updated logic for: <b>{$config['gateway_name']}</b></p>";
    }

    echo "<h2 style='color:green'>SUCCESS! All global configurations have been set.</h2>";
    echo "<p style='color:red'><b>CRITICAL: DELETE THIS FILE (api/public/setup-gateways.php) IMMEDIATELY FOR SECURITY!</b></p>";

} catch (\Exception $e) {
    echo "<h2 style='color:red'>ERROR: " . $e->getMessage() . "</h2>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
}
