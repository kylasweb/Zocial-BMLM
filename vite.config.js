import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-core': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@clerk/clerk-react', 'framer-motion'],
          'vendor-charts': ['echarts', 'echarts-for-react'],
          'vendor-editor': ['@monaco-editor/react', 'codemirror'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    cors: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  }
});
