<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment {{ ucfirst($status) }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-[#f8fafc] text-slate-900 flex items-center justify-center min-h-screen p-4">
    <div class="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] text-center border border-slate-200">
        @if($status === 'success')
            <div class="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-emerald-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1 class="text-3xl font-black mb-3 tracking-tight">Payment Successful!</h1>
            <p class="text-slate-500 mb-10 font-medium">Thank you for your order. Your transaction has been processed securely and confirmed.</p>
        @else
            <div class="w-24 h-24 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-rose-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <h1 class="text-3xl font-black mb-3 tracking-tight">Payment Cancelled</h1>
            <p class="text-slate-500 mb-10 font-medium">The payment process was cancelled or failed. No charges were made to your account.</p>
        @endif

        <div class="space-y-6">
            <a href="{{ $return_url }}" class="block w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm tracking-tight transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                RETURN TO WEBSITE
            </a>
            <div class="flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>Auto-redirecting in</span>
                <span id="timer" class="bg-slate-100 px-2 py-1 rounded text-slate-900">10</span>
                <span>seconds</span>
            </div>
        </div>
    </div>

    <script>
        let seconds = 10;
        const timer = document.getElementById('timer');
        const interval = setInterval(() => {
            seconds--;
            timer.innerText = seconds;
            if (seconds <= 0) {
                clearInterval(interval);
                window.location.href = "{{ $return_url }}";
            }
        }, 1000);
    </script>
</body>
</html>
