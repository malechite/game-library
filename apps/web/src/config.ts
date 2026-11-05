/**
 * Runtime configuration for the SPA.
 *
 * In production the API serves this app, so every request is same-origin and
 * `apiHost` is empty. During `vite dev` the API runs on another port, so
 * `.env.development` points at it and the API's CORS allowlist admits :5173.
 */
export const apiHost: string = import.meta.env.VITE_API_URL ?? "";
