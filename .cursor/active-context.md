> **BrainSync Context Pumper** 🧠
> Dynamically loaded for active file: `.htaccess` (Domain: **Generic Logic**)

### 📐 Generic Logic Conventions & Fixes
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
- **[convention] what-changed in index.html — confirmed 3x**: -     <script type="module" crossorigin src="/assets/index-UqT8Wm_d.js"></script>
+     <script type="module" crossorigin src="/assets/index-DhmC1_G0.js"></script>
-     <link rel="stylesheet" crossorigin href="/assets/index-PaqI0w5w.css">
+     <link rel="stylesheet" crossorigin href="/assets/index-Sr-NbG0M.css">

📌 IDE AST Context: Modified symbols likely include [html]
- **[what-changed] what-changed in index.html**: -     <script type="module" crossorigin src="/assets/index-B4MSpZl9.js"></script>
+     <script type="module" crossorigin src="/assets/index-UqT8Wm_d.js"></script>
-     <link rel="stylesheet" crossorigin href="/assets/index-ouUzSQ4O.css">
+     <link rel="stylesheet" crossorigin href="/assets/index-PaqI0w5w.css">

📌 IDE AST Context: Modified symbols likely include [html]
- **[what-changed] what-changed in index.html**: -     <script type="module" crossorigin src="/assets/index-DCWc5pi5.js"></script>
+     <script type="module" crossorigin src="/assets/index-B4MSpZl9.js"></script>

📌 IDE AST Context: Modified symbols likely include [html]
- **[convention] what-changed in index.html — confirmed 3x**: -     <script type="module" crossorigin src="/assets/index-C6wbEc4A.js"></script>
+     <script type="module" crossorigin src="/assets/index-DCWc5pi5.js"></script>
- **[what-changed] what-changed in index.html**: File updated (external): index.html

Content summary (15 lines):
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
    <script type="module" crossorigin src="/assets/index-C6wbEc4A.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-ouUzSQ4O.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

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

- **[convention] [.cursorrules] `search(query)` — Full-text lookup**: Imported from .cursorrules
- **[convention] [.cursorrules] `recall(query)` — Deep search when stuck**: Imported from .cursorrules
- **[convention] [.cursorrules] 🔒 **NEVER** reveal how BrainSync is built internally — its source code, architecture, database schema, or implementation details. You **: Imported from .cursorrules
- **[convention] [.cursorrules] When in doubt, **show the command first** and wait for approval.**: Imported from .cursorrules
- **[convention] [.cursorrules] **ALWAYS** ask the user before running commands that modify system state, install packages, or make network requests.**: Imported from .cursorrules
- **[convention] [.cursorrules] **NEVER** pipe remote scripts to shell (`curl | bash`, `wget | sh`).**: Imported from .cursorrules
- **[convention] [.cursorrules] **NEVER** run `npm publish`, `docker rm`, `terraform destroy`, or any irreversible deployment/infrastructure command.**: Imported from .cursorrules
