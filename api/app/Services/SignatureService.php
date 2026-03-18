<?php

namespace App\Services;

class SignatureService
{
    /**
     * Generate HMAC-SHA256 signature for the given payload and secret.
     */
    public function generate(array $payload, string $secret): string
    {
        // Sort payload by key to ensure consistency
        ksort($payload);
        
        // Remove 'signature' if it's already in the payload
        unset($payload['signature']);
        
        // Create query string for the payload
        $baseString = http_build_query($payload);
        
        return hash_hmac('sha256', $baseString, $secret);
    }

    /**
     * Verify if the provided signature matches the payload.
     */
    public function verify(array $payload, string $signature, string $secret): bool
    {
        $calculated = $this->generate($payload, $secret);
        
        return hash_equals($calculated, $signature);
    }
}
