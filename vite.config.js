import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@public': path.resolve(__dirname, './src/pages/public'),
      '@admin': path.resolve(__dirname, './src/pages/admin'),
      '@components': path.resolve(__dirname, './src/components'),
      '@routes': path.resolve(__dirname, './src/routes'),
    },
  },
  build: {
    rollupOptions: {
      external: [
        '@clerk/clerk-react',
        '@clerk/shared',
        '@clerk/types'
      ]
    }
  },
  optimizeDeps: {
    include: [
      'react-toastify',
      'framer-motion'
    ],
    exclude: [
      '@clerk/clerk-react',
      '@clerk/shared',
      '@clerk/types'
    ]
  },
  server: {
    fs: {
      // Allow serving files from one level up from the package root
      allow: ['..']
    }
  }
});
