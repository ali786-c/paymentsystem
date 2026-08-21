<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(\App\Services\SignatureService::class, function ($app) {
            return new \App\Services\SignatureService();
        });

        // Register Payment Providers
        $this->app->singleton(\App\Services\Gateways\StripeProvider::class);
        $this->app->singleton(\App\Services\Gateways\NOWPaymentsProvider::class);
        $this->app->singleton(\App\Services\Gateways\CardlinkProvider::class);

        // Register Payment Gateway Manager
        $this->app->singleton(\App\Services\PaymentService::class, function ($app) {
            return new \App\Services\PaymentService(
                $app->make(\App\Services\Gateways\StripeProvider::class),
                $app->make(\App\Services\Gateways\NOWPaymentsProvider::class),
                $app->make(\App\Services\Gateways\CardlinkProvider::class)
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
