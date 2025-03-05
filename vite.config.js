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
          'landing': ['./src/pages/public/LandingPage'],
          'admin': ['./src/pages/admin/Dashboard'],
          'auth': ['./src/pages/auth/Login']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
