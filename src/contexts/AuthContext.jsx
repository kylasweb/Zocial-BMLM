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
      {!clerkLoaded ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};