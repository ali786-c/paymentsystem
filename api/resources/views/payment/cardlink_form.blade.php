<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting to Payment Gateway...</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            color: #1e293b;
        }
        .loader {
            border: 4px solid #f1f5f9;
            border-top: 4px solid #3b82f6;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        p {
            font-weight: 600;
            letter-spacing: -0.01em;
        }
    </style>
</head>
<body>
    <div class="loader"></div>
    <p>Securely redirecting to Cardlink...</p>

    <form id="cardlink-form" action="{{ $apiUrl }}" method="POST">
        @foreach($params as $key => $value)
            <input type="hidden" name="{{ $key }}" value="{{ $value }}">
        @endforeach
    </form>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('cardlink-form').submit();
        });
    </script>
</body>
</html>
