import axios from 'axios';

/**
 * The API host is read from the environment instead of being hard-coded, so no
 * internal hostname/port is baked into the shipped bundle. Falls back to
 * same-origin relative requests, which lets calls inherit the page's TLS rather
 * than being pinned to plaintext http://.
 *
 * Set VITE_API_BASE_URL (or REACT_APP_API_BASE_URL) in .env.local for
 * development, or at build time for production. See .env.example.
 */
const baseURL = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.REACT_APP_API_BASE_URL ||
  ''
)
  .trim()
  .replace(/\/+$/, '');

if (
  baseURL.startsWith('http://') &&
  typeof window !== 'undefined' &&
  window.location.protocol === 'https:'
) {
  // Browsers block this as mixed content; surface the misconfiguration loudly.
  console.error(
    'API base URL uses http:// while the app is served over https://. ' +
      'API requests will be blocked as mixed content.'
  );
}

export const API = axios.create({
  baseURL,
  timeout: 10000,
  headers: { Accept: 'application/json' },
});
