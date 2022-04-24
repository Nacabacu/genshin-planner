import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  resolve: {
    alias: [
      { find: '@data', replacement: path.resolve(__dirname, './data') },
      { find: '@localization', replacement: path.resolve(__dirname, './localization') },
    ],
  },
  plugins: [react()],
  build: {
    outDir: 'docs',
  },
});
