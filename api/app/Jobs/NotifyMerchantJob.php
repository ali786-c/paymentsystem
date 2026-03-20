<?php

namespace App\Jobs;

use App\Models\Invoice;
use App\Services\SignatureService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NotifyMerchantJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 5;

    /**
     * The number of seconds to wait before retrying the job.
     *
     * @var int
     */
    public $backoff = [60, 300, 600, 1800, 3600]; // 1m, 5m, 10m, 30m, 1h

    public $invoice;

    /**
     * Create a new job instance.
     */
    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;
    }

    /**
     * Execute the job.
     */
    public function handle(SignatureService $signatureService): void
    {
        $merchant = $this->invoice->merchant;

        if (!$merchant || !$merchant->webhook_url) {
            Log::warning("No webhook URL configured for merchant: {$merchant->name}");
            return;
        }

        $payload = [
            'order_id' => $this->invoice->external_order_id,
            'status' => $this->invoice->status,
            'amount' => $this->invoice->amount,
            'currency' => $this->invoice->currency,
            'hub_reference' => $this->invoice->id,
            'payment_method' => $this->invoice->payment_method,
            'timestamp' => now()->toIso8601String(),
        ];

        // Sign the payload using the merchant's client_secret
        $payload['signature'] = $signatureService->generate($payload, $merchant->client_secret);

        Log::info("Dispatching webhook to {$merchant->webhook_url} for Invoice #{$this->invoice->id}");

        $response = Http::timeout(10)
            ->withHeaders([
                'X-PayHub-Signature' => $payload['signature'],
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])
            ->post($merchant->webhook_url, $payload);

        if ($response->failed()) {
            Log::error("Webhook failed for Invoice #{$this->invoice->id}. Status: {$response->status()}. Response: {$response->body()}");
            
            // This will trigger a retry based on $tries and $backoff
            throw new \Exception("Merchant webhook returned error status: " . $response->status());
        }

        Log::info("Webhook successfully delivered for Invoice #{$this->invoice->id}");
    }
}
