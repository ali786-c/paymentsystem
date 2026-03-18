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
