<?php
require 'api/vendor/autoload.php';
$app = require_once 'api/bootstrap/app.php';

use App\Models\Invoice;

$invoices = Invoice::latest()->limit(10)->get();
foreach ($invoices as $inv) {
    echo "ID: {$inv->id} | Ext: {$inv->external_order_id} | Amount: {$inv->amount} | Status: {$inv->status} | Method: {$inv->payment_method}\n";
}
