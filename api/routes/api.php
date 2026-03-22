<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

Route::post('/login', [AuthController::class, 'login']);

Route::prefix('payment')->name('api.payment.')->group(function () {
    Route::get('/success/{invoice_id}', [PaymentController::class, 'success'])->name('success');
    Route::get('/cancel/{invoice_id}', [PaymentController::class, 'cancel'])->name('cancel');
    Route::post('/webhook/{provider}', [PaymentController::class, 'webhook'])->name('webhook');
    
    // Public data endpoints for Hub Frontend
    Route::get('/status/{invoice_id}/data', [PaymentController::class, 'getData'])->name('data');
    Route::post('/process', [PaymentController::class, 'process'])->name('process');
    Route::get('/cardlink/form/{invoice_id}', [PaymentController::class, 'cardlinkForm'])->name('cardlink.form');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::prefix('admin')->group(function () {
        Route::get('/merchants', [AdminController::class, 'merchants']);
        Route::post('/merchants', [AdminController::class, 'storeMerchant']);
        
        // Explicit route for global with a unique path to avoid any ambiguity
        Route::get('/merchants/global/configs', [AdminController::class, 'getMerchantConfigs']);
        Route::post('/merchants/global/save-configs', [AdminController::class, 'updateMerchantConfigs']);
        
        Route::post('/test-post', function() { return response()->json(['status' => 'ok']); });
        
        Route::get('/merchants/{id}/configs', [AdminController::class, 'getMerchantConfigs']);
        Route::post('/merchants/{id}/configs', [AdminController::class, 'updateMerchantConfigs']);
        Route::get('/transactions', [AdminController::class, 'transactions']);
    });
});

Route::middleware('merchant.auth')->group(function () {
    Route::post('/checkout/create', [PaymentController::class, 'createSession'])->name('api.checkout.create');
});
