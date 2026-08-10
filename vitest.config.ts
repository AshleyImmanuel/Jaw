import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@jaw/core': path.resolve(__dirname, 'packages/core/src'),
      '@jaw/runtime': path.resolve(__dirname, 'packages/runtime/src'),
      '@jaw/components': path.resolve(__dirname, 'packages/components/src'),
      '@jaw/styling': path.resolve(__dirname, 'packages/styling/src'),
      '@jaw/layout': path.resolve(__dirname, 'packages/layout/src'),
      '@jaw/renderer-web': path.resolve(__dirname, 'packages/renderer-web/src'),
      '@jaw/compiler': path.resolve(__dirname, 'packages/compiler/src'),
      '@jaw/hot-reload': path.resolve(__dirname, 'packages/hot-reload/src'),
      '@jaw/cli': path.resolve(__dirname, 'packages/cli/src'),
    },
  },
  test: {
    globals: true,
    include: ['packages/*/tests/**/*.test.ts', 'tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**/*.ts'],
    },
  },
});
