// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h1>🚀 Pay Hub Database Initializer</h1>";

// 1. Check if bootstrap files exist
$autoload = __DIR__ . '/api/vendor/autoload.php';
$bootstrap = __DIR__ . '/api/bootstrap/app.php';

if (!file_exists($autoload)) {
    die("❌ Error: api/vendor/autoload.php not found. Please run 'composer install' in the api folder first.");
}
if (!file_exists($bootstrap)) {
    die("❌ Error: api/bootstrap/app.php not found.");
}

// 2. Bootstrap Laravel
require $autoload;
$app = require_once $bootstrap;
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
