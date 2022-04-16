import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  resolve: {
    alias: [{ find: '@data', replacement: path.resolve(__dirname, './data') }],
  },
  plugins: [react()],
  build: {
    outDir: 'docs',
  },
});
