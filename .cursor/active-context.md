> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `api\app\Services\Gateways\StripeProvider.php` (Domain: **Generic Logic**)

### 📐 Generic Logic Conventions & Fixes
- **[sys_01] Added session cookies authentication — prevents null/undefined runtime crashes**: -                     ];
+                         'holder_name' => null,
- 
+                     ];
-                     try {
+ 
-                         $paymentIntentId = null;
+                     try {
-                         if ($event->type === 'checkout.session.completed') {
+                         $paymentIntentId = null;
-                             $paymentIntentId = $object->payment_intent;
+                         if ($event->type === 'checkout.session.completed') {
-                         } else {
+                             $paymentIntentId = $object->payment_intent;
-                             $paymentIntentId = $object->id;
+                         } else {
-                         }
+                             $paymentIntentId = $object->id;
- 
+                         }
-                         if ($paymentIntentId) {
+ 
-                             $intent = $this->client->paymentIntents->retrieve($paymentIntentId, ['expand' => ['payment_method']]);
+                         if ($paymentIntentId) {
-                             if ($intent->payment_method && $intent->payment_method->type === 'card') {
+                             $intent = $this->client->paymentIntents->retrieve($paymentIntentId, ['expand' => ['payment_method']]);
-                                 $cardDetails['last4'] = $intent->payment_method->card->last4;
+                             if ($intent->payment_method && $intent->payment_method->type === 'card') {
-                                 $cardDetails['brand'] = $intent->payment_method->card->brand;
+                                 $cardDetails['last4'] = $intent->payment_method->card->last4;
-                                 Log::info("StripeProvider: Extracted card details: {$cardDetails['brand']} **** {$cardDetails['last4']}");
+                                 $cardDetails['brand'] = $intent->payment_method->card->brand;
-                             }
+                                 $cardDet
… [diff truncated]
- **[sys_01] sys_01 in 2026_04_05_112259_add_card_holder_name_to_invoices.php**: File updated (external): api/database/migrations/2026_04_05_112259_add_card_holder_name_to_invoices.php

Content summary (29 lines):
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('card_holder_name')->nullable()->after('card_brand');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    
- **[sys_01] Updated schema Correctly**: - // We mimic the request that Stripe would send to /api/webhook/stripe/{invoice_id}
+ try {
- try {
+     // Correctly create the request with the payload in the parameters
-         "/api/webhook/stripe/{$invoice->id}",
+         "/api/payment/webhook/stripe", // Correct URL structure based on api.php
-         [],
+         $payload
-         [],
+     );
-         [],
+     
-         [],
+     // Set the request instance in the container
-         json_encode($payload)
+     app()->instance('request', $request);
-     );
+ 
-     
+     $controller = app(App\Http\Controllers\PaymentController::class);
-     $controller = app(App\Http\Controllers\PaymentController::class);
+     $response = $controller->webhook($request, 'stripe');
-     $response = $controller->webhook($request, 'stripe', $invoice->id);
+     
-     
+     echo "Webhook Response: " . $response->getStatusCode() . " " . $response->getContent() . "\n";
-     echo "Webhook Response: " . $response->getStatusCode() . " " . $response->getContent() . "\n";
+ } catch (\Exception $e) {
- } catch (\Exception $e) {
+     echo "ERROR: " . $e->getMessage() . "\n";
-     echo "ERROR: " . $e->getMessage() . "\n";
+ }
- }
+ 
- 
+ // 7. Verification - Check if Database was updated
- // 7. Verification - Check if Database was updated
+ $invoice->refresh();
- $invoice->refresh();
+ 
- 
+ echo "\n--- VERIFICATION RESULTS ---\n";
- echo "\n--- VERIFICATION RESULTS ---\n";
+ echo "Final Invoice Status: " . $invoice->status . "\n";
- echo "Final Invoice Status: " . $invoice->status . "\n";
+ echo "Card Brand: " . ($invoice->card_brand ?: 'MISSING') . "\n";
- echo "Card Brand: " . ($invoice->card_brand ?: 'MISSING') . "\n";
+ echo "Card Last 4: " . ($invoice->card_last4 ?: 'MISSING') . "\n";
- echo "Card Last 4: " . ($invoice->card_last4 ?: 'MISSING') . "\n";
+ 
- 
+ if ($invoice->card_brand === 'visa' && $invoice->card_last4 === '4242') {
- if ($invoice->card_brand === 'visa' && $invoice->card_last4 === '4242') {
+   
… [diff truncated]
- **[sys_10] sys_10 in test_capture.php**: File updated (external): test_capture.php

Content summary (102 lines):
<?php

/**
 * TEST SCRIPT: Verify Stripe Card Detail Capture
 * 
 * This script simulates a Stripe webhook arrival to verify that the
 * Hub correctly extracts and stores card_last4 and card_brand.
 */

// 1. Manually include Laravel's Autoloader and Bootstrap to use Models
require __DIR__ . '/api/vendor/autoload.php';
$app = require_once __DIR__ . '/api/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Invoice;
use App\Mo
- **[sys_02] sys_02 in NotifyMerchantJob.php**: -             'timestamp' => now()->toIso8601String(),
+             'card_last4' => $this->invoice->card_last4,
-         ];
+             'card_brand' => $this->invoice->card_brand,
- 
+             'timestamp' => now()->toIso8601String(),
-         // Sign the payload using the merchant's client_secret
+         ];
-         $payload['signature'] = $signatureService->generate($payload, $merchant->client_secret);
+ 
- 
+         // Sign the payload using the merchant's client_secret
-         Log::info("Dispatching webhook to {$merchant->webhook_url} for Invoice #{$this->invoice->id}");
+         $payload['signature'] = $signatureService->generate($payload, $merchant->client_secret);
-         $response = Http::timeout(10)
+         Log::info("Dispatching webhook to {$merchant->webhook_url} for Invoice #{$this->invoice->id}");
-             ->withHeaders([
+ 
-                 'X-PayHub-Signature' => $payload['signature'],
+         $response = Http::timeout(10)
-                 'Content-Type' => 'application/json',
+             ->withHeaders([
-                 'Accept' => 'application/json',
+                 'X-PayHub-Signature' => $payload['signature'],
-             ])
+                 'Content-Type' => 'application/json',
-             ->post($merchant->webhook_url, $payload);
+                 'Accept' => 'application/json',
- 
+             ])
-         if ($response->failed()) {
+             ->post($merchant->webhook_url, $payload);
-             Log::error("Webhook failed for Invoice #{$this->invoice->id}. Status: {$response->status()}. Response: {$response->body()}");
+ 
-             
+         if ($response->failed()) {
-             // This will trigger a retry based on $tries and $backoff
+             Log::error("Webhook failed for Invoice #{$this->invoice->id}. Status: {$response->status()}. Response: {$response->body()}");
-             throw new \Exception("Merchant webhook returned error status: " . $response->status());
+             
-   
… [diff truncated]
- **[sys_02] Fixed null crash in Webhook — prevents null/undefined runtime crashes**: -                 $invoice->update([
+                 
-                     'status' => $result['status'],
+                 $updateData = [
-                     'payload' => array_merge($invoice->payload ?? [], ['webhook_raw' => $payload])
+                     'status' => $result['status'],
-                 ]);
+                     'payload' => array_merge($invoice->payload ?? [], ['webhook_raw' => $payload])
- 
+                 ];
-                 Log::info("Webhook Step 10: DB Update complete. Dispatched NotifyMerchantJob.");
+ 
-                 
+                 if (isset($result['card_details'])) {
-                 // 4. Notify the merchant (Phase 4 Relay)
+                     $updateData['card_last4'] = $result['card_details']['last4'];
-                 $this->notifyMerchant($invoice);
+                     $updateData['card_brand'] = $result['card_details']['brand'];
-             } else {
+                 }
-                 Log::warning("Webhook Step 9: Verification FAILED. Result: " . json_encode($result));
+ 
-             }
+                 $invoice->update($updateData);
-             return response()->json(['success' => $result['success']]);
+                 Log::info("Webhook Step 10: DB Update complete. Dispatched NotifyMerchantJob.");
-         } catch (\Throwable $e) {
+                 
-             Log::error("Webhook CRITICAL Error ({$providerName}): " . $e->getMessage(), [
+                 // 4. Notify the merchant (Phase 4 Relay)
-                 'type' => get_class($e),
+                 $this->notifyMerchant($invoice);
-                 'file' => $e->getFile(),
+             } else {
-                 'line' => $e->getLine(),
+                 Log::warning("Webhook Step 9: Verification FAILED. Result: " . json_encode($result));
-                 'trace' => $e->getTraceAsString()
+             }
-             ]);
+ 
-             return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
+             
… [diff truncated]
- **[sys_01] sys_01 in Invoice.php**: File updated (external): api/app/Models/Invoice.php

Content summary (31 lines):
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'merchant_id',
        'external_order_id',
        'amount',
        'currency',
        'status',
        'payment_method',
        'gateway_reference',
        'card_last4',
        'card_brand',
        'payload'
    ];

    protected $casts = [
        'payload' => 'array'
    ];

    public function merchant()
    {
        return $this->belongsTo(Merchan
- **[sys_01] sys_01 in 2026_04_05_103354_add_card_details_to_invoices.php**: File updated (external): api/database/migrations/2026_04_05_103354_add_card_details_to_invoices.php

Content summary (29 lines):
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            //
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {

