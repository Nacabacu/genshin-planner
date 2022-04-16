/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
