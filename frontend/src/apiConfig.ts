/**
 * 🔗 Central API Configuration
 * 
 * In production, we use a relative path '/api' to ensure it works across
 * various domains and subdirectories without CORS issues.
 */

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

// We prefer relative path '/api' so it always matches the hosting domain
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (isLocalhost ? 'http://localhost/api' : '/api');

export default API_BASE_URL;
