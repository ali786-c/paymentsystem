> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `api\app\Http\Controllers\AdminController.php` (Domain: **Generic Logic**)

### 📐 Generic Logic Conventions & Fixes
- **[what-changed] Updated schema Models — prevents null/undefined runtime crashes**: -         try {
+         $id = $merchantId === 'global' ? null : $merchantId;
-             $id = $merchantId === 'global' ? null : $merchantId;
+         
-             
+         $validated = $request->validate([
-             $validated = $request->validate([
+             'configs' => 'required|array',
-                 'configs' => 'required|array',
+             'configs.*.gateway_name' => 'required|string',
-                 'configs.*.gateway_name' => 'required|string',
+             'configs.*.config_data' => 'required|array',
-                 'configs.*.config_data' => 'required|array',
+             'configs.*.is_active' => 'boolean',
-                 'configs.*.is_active' => 'boolean',
+         ]);
-             ]);
+ 
- 
+         foreach ($validated['configs'] as $config) {
-             foreach ($validated['configs'] as $config) {
+             \App\Models\GatewayConfig::updateOrCreate(
-                 \App\Models\GatewayConfig::updateOrCreate(
+                 [
-                     [
+                     'merchant_id' => $id,
-                         'merchant_id' => $id,
+                     'gateway_name' => $config['gateway_name']
-                         'gateway_name' => $config['gateway_name']
+                 ],
-                     ],
+                 [
-                     [
+                     'config_data' => $config['config_data'],
-                         'config_data' => $config['config_data'],
+                     'is_active' => $config['is_active'] ?? true
-                         'is_active' => $config['is_active'] ?? true
+                 ]
-                     ]
+             );
-                 );
+         }
-             }
+ 
- 
+         return response()->json(['success' => true, 'message' => 'Configurations updated successfully']);
-             return response()->json(['success' => true, 'message' => 'Configurations updated successfully']);
+     }
-         } catch (\Exception $e) {
+ }
-             return response()->json([
+ 
-                 'success' => false,
-                 'error' => $e->getMessage(),
-                 'file' => $e->getFile(),
-                 'line' => $e->getLine()
-             ], 500);
-         }
-     }
- }
- 
- **[what-changed] Updated schema Models — prevents null/undefined runtime crashes**: -         \Illuminate\Support\Facades\Log::info("Updating config for merchant: {$merchantId}", [
+         try {
-             'merchant_id' => $merchantId,
+             $id = $merchantId === 'global' ? null : $merchantId;
-             'configs_count' => count($request->input('configs', [])),
+             
-             'method' => $request->method(),
+             $validated = $request->validate([
-             'url' => $request->fullUrl()
+                 'configs' => 'required|array',
-         ]);
+                 'configs.*.gateway_name' => 'required|string',
-         
+                 'configs.*.config_data' => 'required|array',
-         $id = $merchantId === 'global' ? null : $merchantId;
+                 'configs.*.is_active' => 'boolean',
-         
+             ]);
-         $validated = $request->validate([
+ 
-             'configs' => 'required|array',
+             foreach ($validated['configs'] as $config) {
-             'configs.*.gateway_name' => 'required|string',
+                 \App\Models\GatewayConfig::updateOrCreate(
-             'configs.*.config_data' => 'required|array',
+                     [
-             'configs.*.is_active' => 'boolean',
+                         'merchant_id' => $id,
-         ]);
+                         'gateway_name' => $config['gateway_name']
- 
+                     ],
-         foreach ($validated['configs'] as $config) {
+                     [
-             \App\Models\GatewayConfig::updateOrCreate(
+                         'config_data' => $config['config_data'],
-                 [
+                         'is_active' => $config['is_active'] ?? true
-                     'merchant_id' => $id,
+                     ]
-                     'gateway_name' => $config['gateway_name']
+                 );
-                 ],
+             }
-                 [
+ 
-                     'config_data' => $config['config_data'],
+             return response()->json(['success' => true, 'message' => 'Configurations updated successfully']);
-                     'is_active' => $config['is_active'] ?? true
+         } catch (\Exception $e) {
-                 ]
+             return response()->json([
-             );
+                 'success' => false,
-         }
+                 'error' => $e->getMessage(),
- 
+                 'file' => $e->getFile(),
-         return response()->json(['success' => true, 'message' => 'Configurations updated successfully']);
+                 'line' => $e->getLine()
-     }
+             ], 500);
- }
+         }
- 
+     }
+ }
+ 
- **[what-changed] what-changed in AdminController.php**: File updated (external): api/app/Http/Controllers/AdminController.php

Content summary (103 lines):
<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use App\Models\Invoice;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * List all merchants for the dashboard.
     */
    public function merchants()
    {
        return response()->json(Merchant::orderBy('created_at', 'desc')->get());
    }

    /**
     * List all transactions for the dashboard.
     */
    public function transactions()
    {
        return response()->json(
            I
- **[what-changed] what-changed in PaymentController.php**: File updated (external): api/app/Http/Controllers/PaymentController.php

Content summary (340 lines):
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\GatewayConfig;
use App\Services\PaymentService;
use App\Services\SignatureService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    protected $paymentService;
    protected $signatureService;

    public function __construct(PaymentService $paymentService, SignatureService $signatureService)
    {
        $this->paym
- **[what-changed] Added session cookies authentication — ensures atomic multi-step database ope...**: -         // Explicit route for global to bypass potential parameter matching issues
+         // Explicit route for global with a unique path to avoid any ambiguity
-         Route::post('/merchants/global/configs', [AdminController::class, 'updateMerchantConfigs']);
+         Route::post('/merchants/global/save-configs', [AdminController::class, 'updateMerchantConfigs']);
-         Route::get('/merchants/{id}/configs', [AdminController::class, 'getMerchantConfigs']);
+         Route::post('/test-post', function() { return response()->json(['status' => 'ok']); });
-         Route::post('/merchants/{id}/configs', [AdminController::class, 'updateMerchantConfigs']);
+         
-         Route::get('/transactions', [AdminController::class, 'transactions']);
+         Route::get('/merchants/{id}/configs', [AdminController::class, 'getMerchantConfigs']);
-     });
+         Route::post('/merchants/{id}/configs', [AdminController::class, 'updateMerchantConfigs']);
- });
+         Route::get('/transactions', [AdminController::class, 'transactions']);
- 
+     });
- Route::middleware('merchant.auth')->group(function () {
+ });
-     Route::post('/checkout/create', [PaymentController::class, 'createSession'])->name('api.checkout.create');
+ 
- });
+ Route::middleware('merchant.auth')->group(function () {
- 
+     Route::post('/checkout/create', [PaymentController::class, 'createSession'])->name('api.checkout.create');
+ });
+ 
- **[problem-fix] problem-fix in api.php**: File updated (external): api/routes/api.php

Content summary (42 lines):
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

Route::post('/login', [AuthController::class, 'login']);

Route::prefix('payment')->name('api.payment.')->group(function () {
    Route::get('/success/{invoice_id}', [PaymentController::class, 'success'])->name('success');
    Route::get('/cancel/{invoice_id}', [PaymentController::class, 'cancel'])->name('cancel');
    Route:
- **[what-changed] what-changed in PaymentService.php**: File updated (external): api/app/Services/PaymentService.php

Content summary (63 lines):
<?php

namespace App\Services;

use App\Contracts\PaymentProviderInterface;
use App\Services\Gateways\StripeProvider;
use App\Services\Gateways\NOWPaymentsProvider;
use App\Services\Gateways\CardlinkProvider;
use App\Models\Invoice;
use App\Models\GatewayConfig;

class PaymentService
{
    protected $providers = [];

    public function __construct(
        StripeProvider $stripe,
        NOWPaymentsProvider $nowpayments,
        CardlinkProvider $cardlink
    ) {
        $this->providers = [
  
