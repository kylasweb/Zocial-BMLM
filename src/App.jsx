import { HashRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { AuthProvider } from './contexts/AuthContext';
import { NetworkProvider } from './contexts/NetworkContext';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from './components/ui/Toaster';
import './App.css';

function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
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