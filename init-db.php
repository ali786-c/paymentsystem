<?php
/**
 * 🛠️ Database Initialization Script for Pay Hub
 * Visit: https://demo.upgraderproxy.com/init-db.php
 */

use Illuminate\Support\Facades\Artisan;

// 1. Bootstrap Laravel
require __DIR__ . '/api/vendor/autoload.php';
$app = require_once __DIR__ . '/api/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

echo "<h1>🚀 Pay Hub Database Initializer</h1>";
echo "<pre>";

try {
    // 1. Generate Key if missing
    if (empty(env('APP_KEY'))) {
        echo "Generating APP_KEY...\n";
        Artisan::call('key:generate', ['--force' => true]);
        echo Artisan::output();
    }

    // 2. Run Migrations
    echo "Running Migrations...\n";
    Artisan::call('migrate:fresh', [
        '--force' => true,
        '--seed' => true
    ]);
    
    echo Artisan::output();
    echo "\n✅ Success! Database is ready.";
    echo "\nLogin with: test@example.com / password";

} catch (\Exception $e) {
    echo "\n❌ Error: " . $e->getMessage();
    echo "\nTrace: " . $e->getTraceAsString();
}

echo "</pre>";
