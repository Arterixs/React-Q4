import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/React-Q4/",
  plugins: [react()],
  server: {
    open: '/',
  },
  resolve: {
    alias: {
      app: '/src/app',
      assets: '/src/assets',
      components: '/src/components',
      service: '/src/service',
      pages: '/src/pages',
      types: '/src/types',
      styles: '/src/styles',
      ui: '/src/ui',
      helpers: '/src/helpers',
      storage: '/src/storage'
    },
  },
});
