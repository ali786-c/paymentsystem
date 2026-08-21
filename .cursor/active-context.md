> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `api\app\Services\Gateways\StripeProvider.php` (Domain: **Generic Logic**)

### 🔴 Generic Logic Gotchas
- **⚠️ GOTCHA: sys_02 in NotifyMerchantJob.php**: -             'timestamp' => now()->toIso8601String(),
+             'card_holder_name' => $this->invoice->card_holder_name,
-         ];
+             'timestamp' => $this->invoice->paid_at ? $this->invoice->paid_at->toIso8601String() : now()->toIso8601String(),
- 
+         ];
-         // Sign the payload using the merchant's client_secret
+ 
-         $payload['signature'] = $signatureService->generate($payload, $merchant->client_secret);
+         // Sign the payload using the merchant's client_secret
- 
+         $payload['signature'] = $signatureService->generate($payload, $merchant->client_secret);
-         Log::info("Dispatching webhook to {$merchant->webhook_url} for Invoice #{$this->invoice->id}");
+ 
- 
+         Log::info("Dispatching webhook to {$merchant->webhook_url} for Invoice #{$this->invoice->id}");
-         $response = Http::timeout(10)
+ 
-             ->withHeaders([
+         $response = Http::timeout(10)
-                 'X-PayHub-Signature' => $payload['signature'],
+             ->withHeaders([
-                 'Content-Type' => 'application/json',
+                 'X-PayHub-Signature' => $payload['signature'],
-                 'Accept' => 'application/json',
+                 'Content-Type' => 'application/json',
-             ])
+                 'Accept' => 'application/json',
-             ->post($merchant->webhook_url, $payload);
+             ])
- 
+             ->post($merchant->webhook_url, $payload);
-         if ($response->failed()) {
+ 
-             Log::error("Webhook failed for Invoice #{$this->invoice->id}. Status: {$response->status()}. Response: {$response->body()}");
+         if ($response->failed()) {
-             
+             Log::error("Webhook failed for Invoice #{$this->invoice->id}. Status: {$response->status()}. Response: {$response->body()}");
-             // This will trigger a retry based on $tries and $backoff
+             
-             throw new \Exception("Merchant webhook returned error status:
… [diff truncated]
- **⚠️ GOTCHA: Fixed null crash in Webhook — prevents null/undefined runtime crashes**: -                 }
+                     $updateData['card_holder_name'] = $result['card_details']['holder_name'] ?? null;
- 
+                     $updateData['paid_at'] = $result['card_details']['paid_at'] ?? now();
-                 $invoice->update($updateData);
+                 }
-                 Log::info("Webhook Step 10: DB Update complete. Dispatched NotifyMerchantJob.");
+                 $invoice->update($updateData);
-                 
+ 
-                 // 4. Notify the merchant (Phase 4 Relay)
+                 Log::info("Webhook Step 10: DB Update complete. Dispatched NotifyMerchantJob.");
-                 $this->notifyMerchant($invoice);
+                 
-             } else {
+                 // 4. Notify the merchant (Phase 4 Relay)
-                 Log::warning("Webhook Step 9: Verification FAILED. Result: " . json_encode($result));
+                 $this->notifyMerchant($invoice);
-             }
+             } else {
- 
+                 Log::warning("Webhook Step 9: Verification FAILED. Result: " . json_encode($result));
-             return response()->json(['success' => $result['success']]);
+             }
-         } catch (\Throwable $e) {
+ 
-             Log::error("Webhook CRITICAL Error ({$providerName}): " . $e->getMessage(), [
+             return response()->json(['success' => $result['success']]);
-                 'type' => get_class($e),
+         } catch (\Throwable $e) {
-                 'file' => $e->getFile(),
+             Log::error("Webhook CRITICAL Error ({$providerName}): " . $e->getMessage(), [
-                 'line' => $e->getLine(),
+                 'type' => get_class($e),
-                 'trace' => $e->getTraceAsString()
+                 'file' => $e->getFile(),
-             ]);
+                 'line' => $e->getLine(),
-             return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
+                 'trace' => $e->getTraceAsString()
-         }
+             ]);
-
… [diff truncated]

### 📐 Generic Logic Conventions & Fixes
- **[sys_01] Added session cookies authentication — prevents null/undefined runtime crashes**: -                                 Log::info("StripeProvider: Extracted card details: {$cardDetails['brand']} **** {$cardDetails['last4']}");
+                                 $cardDetails['holder_name'] = $intent->payment_method->billing_details->name ?? null;
-                             }
+                                 $cardDetails['paid_at'] = date('Y-m-d H:i:s', $intent->created);
-                         }
+                                 Log::info("StripeProvider: Extracted card details: {$cardDetails['brand']} **** {$cardDetails['last4']} for {$cardDetails['holder_name']}");
-                     } catch (\Throwable $ce) {
+                             }
-                         Log::warning("StripeProvider: Failed to extract card details. " . $ce->getMessage());
+                         }
-                     }
+                     } catch (\Throwable $ce) {
- 
+                         Log::warning("StripeProvider: Failed to extract card details. " . $ce->getMessage());
-                     return [
+                     }
-                         'success' => true,
+ 
-                         'status' => 'paid',
+                     return [
-                         'reference' => $object->id,
+                         'success' => true,
-                         'external_order_id' => $extOrderId,
+                         'status' => 'paid',
-                         'card_details' => $cardDetails
+                         'reference' => $object->id,
-                     ];
+                         'external_order_id' => $extOrderId,
-                 }
+                         'card_details' => $cardDetails
-             } catch (\Throwable $e) {
+                     ];
-                 Log::warning("StripeProvider: Secure verification failed/timed out. Falling back to payload trust. Error: " . $e->getMessage());
+                 }
-                 
+             } catch (\Throwable $e) {
-                 // 2. FALLBACK: Trust the
… [diff truncated]
- **[sys_08] Added session cookies authentication — prevents null/undefined runtime crashes — confirmed 3x**: -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 <?php
+                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
… [diff truncated]
- **[sys_01] sys_01 in 2026_04_05_164000_add_extra_details_to_invoices_table.php**: File updated (external): api/database/migrations/2026_04_05_164000_add_extra_details_to_invoices_table.php

Content summary (40 lines):
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
            if (!Schema::hasColumn('invoices', 'card_last4')) {
                $table->string('card_last4', 4)->nullable();
            }
            if (!Schema::hasColumn('invoices'
- **[sys_08] sys_01 in Invoice.php — confirmed 4x**: -         'payload' => 'array'
+         'payload' => 'array',
-     ];
+         'paid_at' => 'datetime'
- 
+     ];
-     public function merchant()
+ 
-     {
+     public function merchant()
-         return $this->belongsTo(Merchant::class);
+     {
-     }
+         return $this->belongsTo(Merchant::class);
- }
+     }
- 
+ }
+ 
- **[sys_01] sys_01 in 2026_04_05_112259_add_card_holder_name_to_invoices.php**: -             $table->string('card_holder_name')->nullable()->after('card_brand');
+             //
-             $table->dropColumn('card_holder_name');
+             //
- **[sys_02] sys_02 in test_capture.php**: - 
+ echo "Card Holder: " . ($invoice->card_holder_name ?: 'MISSING') . "\n";
- if ($invoice->card_brand === 'visa' && $invoice->card_last4 === '4242') {
+ 
-     echo "\n✅ SUCCESS: Card details captured correctly!\n";
+ if ($invoice->card_brand === 'visa' && $invoice->card_last4 === '4242' && $invoice->card_holder_name === 'John Doe') {
- } else {
+     echo "\n✅ SUCCESS: All card details (including holder name) captured correctly!\n";
-     echo "\n❌ FAILURE: Card details were not captured.\n";
+ } else {
- }
+     echo "\n❌ FAILURE: Card details were not fully captured.\n";
- 
+ }
- echo "---------------------------\n";
+ 
- 
+ echo "---------------------------\n";
+ 
- **[sys_02] sys_02 in NotifyMerchantJob.php**: -             'timestamp' => now()->toIso8601String(),
+             'card_holder_name' => $this->invoice->card_holder_name,
-         ];
+             'timestamp' => now()->toIso8601String(),
- 
+         ];
-         // Sign the payload using the merchant's client_secret
+ 
-         $payload['signature'] = $signatureService->generate($payload, $merchant->client_secret);
+         // Sign the payload using the merchant's client_secret
- 
+         $payload['signature'] = $signatureService->generate($payload, $merchant->client_secret);
-         Log::info("Dispatching webhook to {$merchant->webhook_url} for Invoice #{$this->invoice->id}");
+ 
- 
+         Log::info("Dispatching webhook to {$merchant->webhook_url} for Invoice #{$this->invoice->id}");
-         $response = Http::timeout(10)
+ 
-             ->withHeaders([
+         $response = Http::timeout(10)
-                 'X-PayHub-Signature' => $payload['signature'],
+             ->withHeaders([
-                 'Content-Type' => 'application/json',
+                 'X-PayHub-Signature' => $payload['signature'],
-                 'Accept' => 'application/json',
+                 'Content-Type' => 'application/json',
-             ])
+                 'Accept' => 'application/json',
-             ->post($merchant->webhook_url, $payload);
+             ])
- 
+             ->post($merchant->webhook_url, $payload);
-         if ($response->failed()) {
+ 
-             Log::error("Webhook failed for Invoice #{$this->invoice->id}. Status: {$response->status()}. Response: {$response->body()}");
+         if ($response->failed()) {
-             
+             Log::error("Webhook failed for Invoice #{$this->invoice->id}. Status: {$response->status()}. Response: {$response->body()}");
-             // This will trigger a retry based on $tries and $backoff
+             
-             throw new \Exception("Merchant webhook returned error status: " . $response->status());
+             // This will trigger a retry b
… [diff truncated]
- **[sys_08] Fixed null crash in Webhook — prevents null/undefined runtime crashes — confirmed 3x**: -                 }
+                     $updateData['card_holder_name'] = $result['card_details']['holder_name'] ?? null;
- 
+                 }
-                 $invoice->update($updateData);
+ 
- 
+                 $invoice->update($updateData);
-                 Log::info("Webhook Step 10: DB Update complete. Dispatched NotifyMerchantJob.");
+ 
-                 
+                 Log::info("Webhook Step 10: DB Update complete. Dispatched NotifyMerchantJob.");
-                 // 4. Notify the merchant (Phase 4 Relay)
+                 
-                 $this->notifyMerchant($invoice);
+                 // 4. Notify the merchant (Phase 4 Relay)
-             } else {
+                 $this->notifyMerchant($invoice);
-                 Log::warning("Webhook Step 9: Verification FAILED. Result: " . json_encode($result));
+             } else {
-             }
+                 Log::warning("Webhook Step 9: Verification FAILED. Result: " . json_encode($result));
- 
+             }
-             return response()->json(['success' => $result['success']]);
+ 
-         } catch (\Throwable $e) {
+             return response()->json(['success' => $result['success']]);
-             Log::error("Webhook CRITICAL Error ({$providerName}): " . $e->getMessage(), [
+         } catch (\Throwable $e) {
-                 'type' => get_class($e),
+             Log::error("Webhook CRITICAL Error ({$providerName}): " . $e->getMessage(), [
-                 'file' => $e->getFile(),
+                 'type' => get_class($e),
-                 'line' => $e->getLine(),
+                 'file' => $e->getFile(),
-                 'trace' => $e->getTraceAsString()
+                 'line' => $e->getLine(),
-             ]);
+                 'trace' => $e->getTraceAsString()
-             return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
+             ]);
-         }
+             return response()->json(['success' => false, 'error' => $e->getMessage()]
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
