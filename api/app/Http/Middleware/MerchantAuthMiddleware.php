<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Merchant;
use App\Services\SignatureService;
use Symfony\Component\HttpFoundation\Response;

class MerchantAuthMiddleware
{
    protected $signatureService;

    public function __construct(SignatureService $signatureService)
    {
        $this->signatureService = $signatureService;
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $clientId = $request->input('client_id') 
            ?? $request->header('X-PayHub-Client-ID') 
            ?? $request->header('X-Client-ID');
            
        $signature = $request->input('signature') 
            ?? $request->header('X-PayHub-Signature') 
            ?? $request->header('X-Signature');

        if (!$clientId || !$signature) {
            return response()->json([
                'success' => false,
                'message' => 'Missing authentication credentials (client_id or signature).'
            ], 401);
        }

        // Find the merchant
        $merchant = Merchant::where('client_id', $clientId)->first();

        if (!$merchant) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid client_id.'
            ], 401);
        }

        // Validate signature
        $payload = $request->all();
        if (!$this->signatureService->verify($payload, $signature, $merchant->client_secret)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid signature verification failed.'
            ], 401);
        }

        // Attach merchant to request
        $request->merge(['merchant' => $merchant]);

        return $next($request);
    }
}
