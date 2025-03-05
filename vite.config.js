import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@clerk/clerk-react', 'framer-motion'],
          charts: ['echarts', 'echarts-for-react'],
          editor: ['@monaco-editor/react', 'codemirror']
        }
      }
    }
  }
});
