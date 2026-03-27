> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `.htaccess` (Domain: **Generic Logic**)

### 📐 Generic Logic Conventions & Fixes
- **[convention] what-changed in .htaccess — confirmed 8x**: -     AddOutputFilterByType DEFLATE text/csstar
+     AddOutputFilterByType DEFLATE text/cssta
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
- **[convention] convention in .gitignore**: File updated (external): .gitignore

Content summary (35 lines):
# 🛡️ Pay Hub Git Ignore
.env
.env.production
.DS_Store
Thumbs.db

# Laravel Specific
api/.env
api/vendor/
api/node_modules/
api/public/storage
api/storage/*.key
api/storage/framework/cache/data/*
api/storage/framework/sessions/*
api/storage/framework/views/*.php
api/storage/logs/*.log
api/*.log

# Frontend Specific
frontend/node_modules/
frontend/dist/

# System Files
.idea/
.vscode/
*.bak
*.tmp

AGENT.md
CLAUDE.md
.agent-mem/

# Auto-generated agent rules (personalized per developer)
.brainsyn
- **[what-changed] what-changed in index.html**: -     <script type="module" crossorigin src="/assets/index-B_52Ohy5.js"></script>
+     <script type="module" crossorigin src="/assets/index-Cu0gWI7K.js"></script>
-     <link rel="stylesheet" crossorigin href="/assets/index-CZeN-4_9.css">
+     <link rel="stylesheet" crossorigin href="/assets/index-Gm7RaDzs.css">

📌 IDE AST Context: Modified symbols likely include [html]
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
- **[convention] what-changed in index.html — confirmed 3x**: -     <script type="module" crossorigin src="/assets/index-lk991wii.js"></script>
+     <script type="module" crossorigin src="/assets/index-BHDunr-j.js"></script>
-     <link rel="modulepreload" crossorigin href="/assets/vendor-CowRQVzI.js">
+     <link rel="modulepreload" crossorigin href="/assets/vendor-DLFzZtnp.js">

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
- **[convention] what-changed in index.html — confirmed 3x**: -     <script type="module" crossorigin src="/assets/index-DhmC1_G0.js"></script>
+     <script type="module" crossorigin src="/assets/index-C4APPrXz.js"></script>

📌 IDE AST Context: Modified symbols likely include [html]
- **[convention] what-changed in index.html — confirmed 3x**: -     <script type="module" crossorigin src="/assets/index-UqT8Wm_d.js"></script>
+     <script type="module" crossorigin src="/assets/index-DhmC1_G0.js"></script>
-     <link rel="stylesheet" crossorigin href="/assets/index-PaqI0w5w.css">
+     <link rel="stylesheet" crossorigin href="/assets/index-Sr-NbG0M.css">

📌 IDE AST Context: Modified symbols likely include [html]
- **[convention] what-changed in index.html — confirmed 3x**: -     <script type="module" crossorigin src="/assets/index-C6wbEc4A.js"></script>
+     <script type="module" crossorigin src="/assets/index-DCWc5pi5.js"></script>
- **[tool-pattern] tool-pattern in .gitignore**: File updated (external): .gitignore

Content summary (32 lines):
# 🛡️ Pay Hub Git Ignore
.env
.env.production
.DS_Store
Thumbs.db

# Laravel Specific
api/.env
api/vendor/
api/node_modules/
api/public/storage
api/storage/*.key
api/storage/framework/cache/data/*
api/storage/framework/sessions/*
api/storage/framework/views/*.php
api/storage/logs/*.log
api/*.log

# Frontend Specific
frontend/node_modules/
frontend/dist/

# System Files
.idea/
.vscode/
*.bak
*.tmp

AGENT.md
CLAUDE.md
.agent-mem/

