import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider, useClerk } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { AuthProvider } from './contexts/AuthContext';
import { NetworkProvider } from './contexts/NetworkContext';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from './components/ui/Toaster';
import './App.css';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
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
        <AuthProvider>
          <NetworkProvider>
            <AppRoutes />
            <Toaster />
          </NetworkProvider>
        </AuthProvider>
      </Router>
    </ClerkProvider>
  );
}

export default App;
