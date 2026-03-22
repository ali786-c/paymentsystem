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
            Invoice::with('merchant:id,name')
                ->orderBy('created_at', 'desc')
                ->limit(100)
                ->get()
        );
    }

    /**
     * Create a new merchant (Admin logic).
     */
    public function storeMerchant(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'webhook_url' => 'nullable|url',
        ]);

        $merchant = Merchant::create([
            'name' => $validated['name'],
            'client_id' => 'hub_' . bin2hex(random_bytes(8)),
            'client_secret' => bin2hex(random_bytes(32)),
            'webhook_url' => $validated['webhook_url'],
            'branding_settings' => [
                'primary_color' => '#3b82f6',
                'logo_url' => null
            ]
        ]);

        return response()->json($merchant, 201);
    }

    /**
     * Get all gateway configurations for a merchant.
     */
    public function getMerchantConfigs($merchantId)
    {
        $id = $merchantId === 'global' ? null : $merchantId;
        $configs = \App\Models\GatewayConfig::where('merchant_id', $id)->get();
        return response()->json($configs);
    }

    /**
     * Update or create gateway configurations for a merchant.
     */
    public function updateMerchantConfigs(Request $request, $merchantId)
    {
        $id = $merchantId === 'global' ? null : $merchantId;
        
        $validated = $request->validate([
            'configs' => 'required|array',
            'configs.*.gateway_name' => 'required|string',
            'configs.*.config_data' => 'required|array',
            'configs.*.is_active' => 'boolean',
        ]);

        foreach ($validated['configs'] as $config) {
            \App\Models\GatewayConfig::updateOrCreate(
                [
                    'merchant_id' => $id,
                    'gateway_name' => $config['gateway_name']
                ],
                [
                    'config_data' => $config['config_data'],
                    'is_active' => $config['is_active'] ?? true
                ]
            );
        }

        return response()->json(['success' => true, 'message' => 'Configurations updated successfully']);
    }
}
