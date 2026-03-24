> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `.htaccess` (Domain: **Generic Logic**)

### 📐 Generic Logic Conventions & Fixes
- **[problem-fix] Patched security issue Performance**: - # 🕒 Performance: Browser Caching (1 Year for Assets)
+ # 🕒 Performance: Browser Caching (1 Year for Assets, 0 for HTML)
-     ExpiresByType image/jpg "access plus 1 year"
+     ExpiresByType text/html "access plus 0 seconds"
-     ExpiresByType image/jpeg "access plus 1 year"
+     ExpiresByType image/jpg "access plus 1 year"
-     ExpiresByType image/gif "access plus 1 year"
+     ExpiresByType image/jpeg "access plus 1 year"
-     ExpiresByType image/png "access plus 1 year"
+     ExpiresByType image/gif "access plus 1 year"
-     ExpiresByType image/svg+xml "access plus 1 year"
+     ExpiresByType image/png "access plus 1 year"
-     ExpiresByType text/css "access plus 1 month"
+     ExpiresByType image/svg+xml "access plus 1 year"
-     ExpiresByType application/javascript "access plus 1 year"
+     ExpiresByType text/css "access plus 1 month"
-     ExpiresByType application/x-javascript "access plus 1 year"
+     ExpiresByType application/javascript "access plus 1 year"
- </IfModule>
+     ExpiresByType application/x-javascript "access plus 1 year"
- 
+ </IfModule>
+ 
+ # 🛡️ Security & Cache Control
+ <IfModule mod_headers.c>
+     <FilesMatch "\.(html|htm)$">
+         Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
+         Header set Pragma "no-cache"
+         Header set Expires "0"
+     </FilesMatch>
+ </IfModule>
+ 
- **[decision] Optimized RewriteCond**: -     # Using absolute path /index.html for best LiteSpeed compatibility
+     RewriteCond %{REQUEST_URI} !^/api
-     RewriteCond %{REQUEST_URI} !^/api
+     RewriteRule ^ /index.html [L]
-     RewriteRule ^ /index.html [L]
+ </IfModule>
- </IfModule>
+ 
- 
+ # 🚀 Performance: Gzip Compression
+ <IfModule mod_deflate.c>
+     AddOutputFilterByType DEFLATE text/plain
+     AddOutputFilterByType DEFLATE text/html
+     AddOutputFilterByType DEFLATE text/xml
+     AddOutputFilterByType DEFLATE text/css
+     AddOutputFilterByType DEFLATE application/xml
+     AddOutputFilterByType DEFLATE application/xhtml+xml
+     AddOutputFilterByType DEFLATE application/rss+xml
+     AddOutputFilterByType DEFLATE application/javascript
+     AddOutputFilterByType DEFLATE application/x-javascript
+ </IfModule>
+ 
+ # 🕒 Performance: Browser Caching (1 Year for Assets)
+ <IfModule mod_expires.c>
+     ExpiresActive On
+     ExpiresByType image/jpg "access plus 1 year"
+     ExpiresByType image/jpeg "access plus 1 year"
+     ExpiresByType image/gif "access plus 1 year"
+     ExpiresByType image/png "access plus 1 year"
+     ExpiresByType image/svg+xml "access plus 1 year"
+     ExpiresByType text/css "access plus 1 month"
+     ExpiresByType application/javascript "access plus 1 year"
+     ExpiresByType application/x-javascript "access plus 1 year"
+ </IfModule>
+ 
- **[decision] Optimized Using**: -     # Use index.html without leading slash for better compatibility
+     # Using absolute path /index.html for best LiteSpeed compatibility
-     RewriteRule . index.html [L]
+     RewriteCond %{REQUEST_URI} !^/api
- </IfModule>
+     RewriteRule ^ /index.html [L]
- 
+ </IfModule>
+ 
- **[decision] Optimized RewriteRule**: -     # Use [L,QSA] to ensure processing stops here and query strings are passed
+     RewriteRule ^api/(.*)$ api/public/index.php [L,QSA]
-     RewriteRule ^api/(.*)$ api/public/index.php [L,QSA]
+ 
- 
+     # 2. Prevent rewrite loop for physical assets
-     # 2. Prevent rewrite loop for index.html and init-db.php
+     RewriteRule ^assets/(.*)$ - [L]
-     RewriteRule ^(index\.html|init-db\.php)$ - [L]
+     RewriteRule ^index\.html$ - [L]
-     # 3. Serve physical files if they exist
+     # 3. Serve physical files/directories if they exist
-     # We use (.*) and /index.html for absolute path lookup on LiteSpeed
+     # Use index.html without leading slash for better compatibility
-     RewriteRule ^(.*)$ /index.html [L]
+     RewriteRule . index.html [L]
- **[what-changed] what-changed in index.html**: -     <script type="module" crossorigin src="/assets/index-CKejYS6M.js"></script>
+     <script type="module" crossorigin src="/assets/index-B_52Ohy5.js"></script>
-     <link rel="modulepreload" crossorigin href="/assets/vendor-Coa8jgCD.js">
+     <link rel="modulepreload" crossorigin href="/assets/vendor-DcM9QrfU.js">
-     <link rel="stylesheet" crossorigin href="/assets/index-CePD2NlC.css">
+     <link rel="stylesheet" crossorigin href="/assets/index-CZeN-4_9.css">

📌 IDE AST Context: Modified symbols likely include [html]
- **[convention] what-changed in index.html — confirmed 3x**: -     <script type="module" crossorigin src="/assets/index-Fh-V3bMO.js"></script>
+     <script type="module" crossorigin src="/assets/index-CKejYS6M.js"></script>
-     <link rel="modulepreload" crossorigin href="/assets/vendor-D4tobTwW.js">
+     <link rel="modulepreload" crossorigin href="/assets/vendor-Coa8jgCD.js">
-     <link rel="stylesheet" crossorigin href="/assets/index-C7g4zysY.css">
+     <link rel="stylesheet" crossorigin href="/assets/index-CePD2NlC.css">

📌 IDE AST Context: Modified symbols likely include [html]
- **[what-changed] what-changed in index.html**: -     <script type="module" crossorigin src="/assets/index-DjwwSNUK.js"></script>
+     <script type="module" crossorigin src="/assets/index-Fh-V3bMO.js"></script>
-     <link rel="stylesheet" crossorigin href="/assets/index-DPYR_ymg.css">
+     <link rel="stylesheet" crossorigin href="/assets/index-C7g4zysY.css">

📌 IDE AST Context: Modified symbols likely include [html]
- **[what-changed] what-changed in index.html**: -     <script type="module" crossorigin src="/assets/index-BHDunr-j.js"></script>
+     <script type="module" crossorigin src="/assets/index-DjwwSNUK.js"></script>
-     <link rel="modulepreload" crossorigin href="/assets/vendor-DLFzZtnp.js">
+     <link rel="modulepreload" crossorigin href="/assets/vendor-D4tobTwW.js">

📌 IDE AST Context: Modified symbols likely include [html]
- **[convention] what-changed in index.html — confirmed 3x**: -     <script type="module" crossorigin src="/assets/index-lk991wii.js"></script>
+     <script type="module" crossorigin src="/assets/index-BHDunr-j.js"></script>
-     <link rel="modulepreload" crossorigin href="/assets/vendor-CowRQVzI.js">
+     <link rel="modulepreload" crossorigin href="/assets/vendor-DLFzZtnp.js">

📌 IDE AST Context: Modified symbols likely include [html]
- **[what-changed] what-changed in index.html**: -     <script type="module" crossorigin src="/assets/index-_Js5rtkt.js"></script>
+     <script type="module" crossorigin src="/assets/index-lk991wii.js"></script>
-     <link rel="modulepreload" crossorigin href="/assets/vendor-DBHrDuQ0.js">
+     <link rel="modulepreload" crossorigin href="/assets/vendor-CowRQVzI.js">
-     <link rel="stylesheet" crossorigin href="/assets/index-DHXcs1OY.css">
+     <link rel="stylesheet" crossorigin href="/assets/index-DPYR_ymg.css">

📌 IDE AST Context: Modified symbols likely include [html]
- **[convention] Strengthened types index**: -     <script type="module" crossorigin src="/assets/index-z_C_8jjS.js"></script>
+     <script type="module" crossorigin src="/assets/index-_Js5rtkt.js"></script>
-     <link rel="stylesheet" crossorigin href="/assets/index-DHXcs1OY.css">
+     <link rel="modulepreload" crossorigin href="/assets/rolldown-runtime-COnpUsM8.js">
-   </head>
+     <link rel="modulepreload" crossorigin href="/assets/vendor-DBHrDuQ0.js">
-   <body>
+     <link rel="stylesheet" crossorigin href="/assets/index-DHXcs1OY.css">
-     <div id="root"></div>
+   </head>
-   </body>
+   <body>
- </html>
+     <div id="root"></div>
- 
+   </body>
+ </html>
+ 

📌 IDE AST Context: Modified symbols likely include [html]
- **[what-changed] what-changed in index.html**: -     <script type="module" crossorigin src="/assets/index-C4APPrXz.js"></script>
+     <script type="module" crossorigin src="/assets/index-z_C_8jjS.js"></script>
-     <link rel="stylesheet" crossorigin href="/assets/index-Sr-NbG0M.css">
+     <link rel="stylesheet" crossorigin href="/assets/index-DHXcs1OY.css">

📌 IDE AST Context: Modified symbols likely include [html]
- **[convention] what-changed in index.html — confirmed 3x**: -     <script type="module" crossorigin src="/assets/index-DhmC1_G0.js"></script>
+     <script type="module" crossorigin src="/assets/index-C4APPrXz.js"></script>

📌 IDE AST Context: Modified symbols likely include [html]
- **[what-changed] what-changed in index.html**: -     <title>frontend</title>
+     <title>LinkPayPro - Payment Orchestration</title>

📌 IDE AST Context: Modified symbols likely include [html]
- **[convention] what-changed in index.html — confirmed 3x**: -     <script type="module" crossorigin src="/assets/index-UqT8Wm_d.js"></script>
+     <script type="module" crossorigin src="/assets/index-DhmC1_G0.js"></script>
-     <link rel="stylesheet" crossorigin href="/assets/index-PaqI0w5w.css">
+     <link rel="stylesheet" crossorigin href="/assets/index-Sr-NbG0M.css">

📌 IDE AST Context: Modified symbols likely include [html]
