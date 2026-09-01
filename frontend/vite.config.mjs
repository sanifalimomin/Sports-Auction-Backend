import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: path.resolve(rootDir, 'src/api'),
      assets: path.resolve(rootDir, 'src/assets'),
      commons: path.resolve(rootDir, 'src/commons'),
      components: path.resolve(rootDir, 'src/components'),
      router: path.resolve(rootDir, 'src/router'),
      utils: path.resolve(rootDir, 'src/utils'),
    },
  },
  envPrefix: ['VITE_', 'REACT_APP_'],
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
