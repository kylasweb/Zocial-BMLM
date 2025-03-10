import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { AuthProvider } from './contexts/AuthContext';
import { NetworkProvider } from './contexts/NetworkContext';
import { FeatureProvider } from './contexts/FeatureContext';
import ErrorBoundary from './components/ErrorBoundary';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from './components/ui/Toaster';
import { initSentry } from './utils/sentry';
import { MonitoringService } from './services/MonitoringService';
import { BackupService } from './services/BackupService';
import './App.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable');
}

// Initialize services
initSentry();

function App() {
  useEffect(() => {
    // Initialize monitoring and backups
    MonitoringService.initializeMonitoring();
    BackupService.scheduleBackups();
  }, []);

  return (
    <ErrorBoundary>
      <FeatureProvider>
        <ClerkProvider 
          publishableKey={clerkPubKey}
          appearance={{
            baseTheme: "dark",
            variables: {
              colorPrimary: 'rgb(14, 165, 233)',
              colorBackground: 'rgb(17, 24, 39)',
              colorText: 'rgb(255, 255, 255)',
              colorInputText: 'rgb(255, 255, 255)',
              colorInputBackground: 'rgb(31, 41, 55)',
              colorDanger: 'rgb(239, 68, 68)',
            },
            elements: {
              formButtonPrimary: 'bg-primary-600 hover:bg-primary-700',
              card: 'bg-white dark:bg-gray-800',
              headerTitle: 'text-gray-900 dark:text-white',
              headerSubtitle: 'text-gray-600 dark:text-gray-300',
            }
          }}
        >
          <Router>
            <NetworkProvider>
              <AuthProvider>
                <AppRoutes />
                <Toaster />
              </AuthProvider>
            </NetworkProvider>
          </Router>
        </ClerkProvider>
      </FeatureProvider>
    </ErrorBoundary>
  );
}

export default App;
