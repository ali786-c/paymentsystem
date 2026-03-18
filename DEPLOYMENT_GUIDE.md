# 🛠️ Pay Hub Deployment & Troubleshooting Guide

This document captures the major issues encountered during the deployment of Upgrader Pay Hub on a cPanel/LiteSpeed environment and their permanent solutions.

---

## 1. PHP Version & Dependency Conflicts
**Issue:** The server was running **PHP 8.2.30**, but the application (Laravel 11+) was pulling dependencies (like Symfony 8) that require **PHP 8.4+**.  
**Symptoms:** `composer install` failures and 500 errors.

**Solution:**
- Modified `api/composer.json` to hard-pin problematic components to version 7.
- Added `platform` config to `composer.json` to stick to PHP 8.2.30.
- **Action:** Always run `composer update` locally with these constraints before pushing the `composer.lock` file.

---

## 2. 404 Error on Page Refresh (SPA Routing)
**Issue:** Refreshing any page (e.g., `/login`) resulted in a 404 because LiteSpeed was looking for a physical folder.  
**Root Cause:** The site was hosted outside `public_html`, where `.htaccess` rules were ignored by server security policies.

**Solution:**
- Moved the project to `public_html/demo.upgraderproxy.com/`.
- Updated `.htaccess` with robust SPA rewrite rules:
  ```apache
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
  ```
- **Action:** Ensure "Addon Domains" in cPanel point to a folder inside `public_html`.

---

## 3. Terminal Command Failures
**Issue:** Commands like `php artisan migrate` produced no output and failed to update the database.

**Solution:**
- Created a bootstrap script `init-db.php` in the root.
- This allows running migrations and seeders via the browser: `https://yourdomain.com/init-db.php`.
- **Action:** Use this script if the SSH/Terminal environment is restricted or crashing.

---

## 4. CORS & Hardcoded Localhost Errors
**Issue:** Login failed with a CORS error because the frontend was trying to connect to `http://localhost/api/login`.  
**Root Cause:** The `frontend/.env` file had a hardcoded `VITE_API_BASE_URL=http://localhost/api` which was baked into the build assets.

**Solution:**
- Created `frontend/src/apiConfig.ts` to handle dynamic API URL detection.
- Updated `frontend/.env` to use the relative path: `VITE_API_BASE_URL=/api`.
- **Action:** Whenever the UI or API URL logic changes, you **must** rebuild the frontend:
  ```bash
  cd frontend
  npm run build
  cp -r dist/* ../  # Copy build to root
  ```

---

## 5. Deployment Workflow (Permanent Rule)
To ensure the site works after any changes:
1.  Update code in `frontend/src`.
2.  Clean `frontend/.env` (Ensure `VITE_API_BASE_URL=/api`).
3.  Run `npm run build` in the `frontend` folder.
4.  Copy contents of `frontend/dist` to the project root (`upgrader-pay-hub/`).
5.  Push to GitHub and Deploy via cPanel.

---
*Created on: March 18, 2026*
