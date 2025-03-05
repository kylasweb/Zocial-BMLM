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
          'landing-sections': [
            './src/pages/public/LandingPage/sections/Hero',
            './src/pages/public/LandingPage/sections/Features',
            './src/pages/public/LandingPage/sections/Pricing',
            './src/pages/public/LandingPage/sections/FAQ',
            './src/pages/public/LandingPage/sections/Tokenomics'
          ],
          'admin': ['./src/pages/admin/Dashboard'],
          'admin-components': [
            './src/pages/admin/Dashboard/components/DashboardHeader',
            './src/pages/admin/Dashboard/components/StatCards',
            './src/pages/admin/Dashboard/components/ActivityFeed',
            './src/pages/admin/Dashboard/components/AnalyticsCharts',
            './src/pages/admin/Dashboard/components/QuickActions'
          ],
          'auth': ['./src/pages/auth/Login'],
          'dashboard-features': [
            './src/components/dashboard/BinaryMatrix',
            './src/components/dashboard/InvestmentPlan',
            './src/components/dashboard/PoolManagement',
            './src/components/dashboard/RankManagement',
            './src/components/dashboard/CrmIntegration',
            './src/components/dashboard/CommissionManagement'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
