<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GatewayConfig extends Model
{
    protected $fillable = [
        'merchant_id',
        'gateway_name',
        'config_data',
        'is_active'
    ];

    protected $casts = [
        'config_data' => 'encrypted:array',
        'is_active' => 'boolean'
    ];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }
}
