import { createContext, useContext } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useToast } from '../components/ui/Toaster';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { user, isLoaded: clerkLoaded } = useUser();
  const { signOut } = useClerk();
  const toast = useToast();

  const logout = async () => {
    try {
      await signOut();
      toast('Successfully logged out', 'success');
    } catch (error) {
      console.error('Logout error:', error);
      toast('Error during logout', 'error');
    }
  };

  const value = {
    user,
    logout,
    loading: !clerkLoaded
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};