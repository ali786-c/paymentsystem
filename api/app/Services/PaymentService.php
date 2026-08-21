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
            'stripe' => $stripe,
            'nowpayments' => $nowpayments,
            'cardlink' => $cardlink,
        ];
    }

    /**
     * Get the provider instance by name.
     */
    public function getProvider(string $name): PaymentProviderInterface
    {
        if (!isset($this->providers[$name])) {
            throw new \InvalidArgumentException("Unsupported payment provider: {$name}");
        }

        return $this->providers[$name];
    }

    /**
     * Process an invoice through the selected provider.
     */
    public function processInvoice(Invoice $invoice, string $gatewayName): string
    {
        $provider = $this->getProvider($gatewayName);
        
        // Fetch gateway configuration for this merchant or global default
        $config = GatewayConfig::where('gateway_name', $gatewayName)
            ->where(function($query) use ($invoice) {
                $query->where('merchant_id', $invoice->merchant_id)
                      ->orWhereNull('merchant_id');
            })
            ->orderBy('merchant_id', 'desc') // Prefer merchant-specific config
            ->first();

        if (!$config || !$config->is_active) {
            throw new \Exception("Gateway {$gatewayName} is not configured or active.");
        }

        return $provider->createInvoice($invoice, $config->config_data);
    }
}
