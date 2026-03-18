<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->bootstrapWith([
    \Illuminate\Foundation\Bootstrap\LoadEnvironmentVariables::class,
    \Illuminate\Foundation\Bootstrap\LoadConfiguration::class,
    \Illuminate\Foundation\Bootstrap\HandleExceptions::class,
    \Illuminate\Foundation\Bootstrap\RegisterFacades::class,
    \Illuminate\Foundation\Bootstrap\RegisterProviders::class,
    \Illuminate\Foundation\Bootstrap\BootProviders::class,
]);

$invoiceId = 2;
$invoice = \App\Models\Invoice::with('merchant')->find($invoiceId);

if ($invoice) {
    echo "INVOICE FOUND\n";
    echo "ID: " . $invoice->id . "\n";
    echo "Status: " . $invoice->status . "\n";
    echo "Amount: " . $invoice->amount . "\n";
    echo "Merchant: " . $invoice->merchant->name . "\n";
} else {
    echo "INVOICE NOT FOUND\n";
}
