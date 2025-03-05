import { useNavigate } from 'react-router-dom';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

export default function Login() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  // Redirect if already signed in
  if (isSignedIn) {
    navigate('/dashboard');
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="w-full flex items-center justify-center p-12">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-xl">Join our growing community of successful networkers</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <SignedOut>
            <div className="space-y-6">
              <SignIn 
                appearance={{
                  variables: {
                    colorPrimary: '#0ea5e9'
                  }
                }}
                afterSignInUrl="/dashboard"
              />
              <div className="text-center text-gray-600">or</div>
              <SignUp 
                appearance={{
                  variables: {
                    colorPrimary: '#0ea5e9'
                  }
                }}
                afterSignUpUrl="/onboarding"
              />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="text-center">
              <p>Redirecting to dashboard...</p>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}