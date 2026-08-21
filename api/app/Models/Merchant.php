<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Merchant extends Model
{
    protected $fillable = [
        'name',
        'client_id',
        'client_secret',
        'webhook_url',
        'branding_settings'
    ];

    protected $casts = [
        'branding_settings' => 'array',
        'client_secret' => 'encrypted'
    ];

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function gatewayConfigs()
    {
        return $this->hasMany(GatewayConfig::class);
    }
}
