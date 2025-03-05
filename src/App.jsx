import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { AuthProvider } from './contexts/AuthContext';
import { NetworkProvider } from './contexts/NetworkContext';
import { FeatureProvider } from './contexts/FeatureContext';
import ErrorBoundary from './components/ErrorBoundary';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from './components/ui/Toaster';
import './App.css';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable');
}

// Add Content Security Policy
if (typeof window !== 'undefined') {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';";
  document.head.appendChild(meta);
}

function App() {
  return (
    <ErrorBoundary>
      <FeatureProvider>
        <ClerkProvider 
          publishableKey={clerkPubKey}
          appearance={{
            baseTheme: dark,
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
