/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API origin for dev; unset in production (same-origin). */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
