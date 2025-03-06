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
        '@clerk/themes',
        '@clerk/shared',
        '@clerk/shared/loadClerkJsScript',
        '@clerk/shared/object',
        /^@clerk\/shared\/.*/
      ],
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@clerk/clerk-react')) {
              return 'clerk';
            }
            if (id.includes('@radix-ui/react-') || id.includes('react-toastify')) {
              return 'ui-libs';
            }
            if (id.includes('recharts')) {
              return 'charts';
            }
            if (id.includes('monaco-editor') || id.includes('codemirror')) {
              return 'editors';
            }
            if (id.includes('ethers')) {
              return 'web3';
            }
            return 'vendor';
          }
        }
      },
    },
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: ['ethers', 'react-toastify'],
    exclude: [
      '@clerk/clerk-react',
      '@clerk/shared',
      '@clerk/themes'
    ]
  },
});
