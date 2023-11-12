import { defineConfig } from 'vitest/config';
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
      storage: '/src/storage',
      test: '/src/test'
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup-test.ts'],
    coverage: {
      provider: 'v8'
    }
  },
});
