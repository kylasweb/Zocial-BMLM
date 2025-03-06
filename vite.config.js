import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      external: ['@clerk/themes'],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'clerk': ['@clerk/clerk-react'],
          'ui-libs': ['@radix-ui/react-toast', '@radix-ui/react-dialog'],
          'charts': ['recharts'],
          'editors': ['@monaco-editor/react', '@codemirror/basic-setup'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
