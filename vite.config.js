import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Multi-page build: every route is a real HTML file, so GitHub Pages serves it
// directly (no 404 redirect trick) and pages can use cross-document view transitions.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        plater: resolve(import.meta.dirname, 'work/plater/index.html'),
        vault: resolve(import.meta.dirname, 'work/vault/index.html'),
        aura: resolve(import.meta.dirname, 'work/aura/index.html'),
        homeBg: resolve(import.meta.dirname, 'bg/index.html'),
        platerBg: resolve(import.meta.dirname, 'bg/work/plater/index.html'),
        vaultBg: resolve(import.meta.dirname, 'bg/work/vault/index.html'),
        auraBg: resolve(import.meta.dirname, 'bg/work/aura/index.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
});
