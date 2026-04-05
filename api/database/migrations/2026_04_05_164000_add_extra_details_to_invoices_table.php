<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            if (!Schema::hasColumn('invoices', 'card_last4')) {
                $table->string('card_last4', 4)->nullable();
            }
            if (!Schema::hasColumn('invoices', 'card_brand')) {
                $table->string('card_brand')->nullable();
            }
            if (!Schema::hasColumn('invoices', 'card_holder_name')) {
                $table->string('card_holder_name')->nullable();
            }
            if (!Schema::hasColumn('invoices', 'paid_at')) {
                $table->timestamp('paid_at')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn(['card_holder_name', 'paid_at']);
        });
    }
};
