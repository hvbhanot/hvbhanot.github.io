/// <reference types="vite/client" />

declare module '*.md?raw' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_ENABLE_LIGHT_THEME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
