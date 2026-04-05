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
        return $this->belongsTo(Merchant::class);
    }
}
