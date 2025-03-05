import { createContext, useContext, useEffect } from 'react';
import { useUser, useClerk, useSession } from '@clerk/clerk-react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const { user, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const { session } = useSession();
  const { signOut } = useClerk();

  useEffect(() => {
    if (isUserLoaded && !isSignedIn) {
      // Handle user signed out state
      console.log('User is signed out');
    }
  }, [isSignedIn, isUserLoaded]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    isLoaded: isUserLoaded,
    isSignedIn,
    session,
    signOut: handleSignOut,
    role: user?.publicMetadata?.role || 'user',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
