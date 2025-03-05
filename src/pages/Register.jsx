import { useNavigate } from 'react-router-dom';
import { SignUp, useUser } from '@clerk/clerk-react';

export default function Register() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    navigate('/onboarding');
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="w-full flex items-center justify-center p-12">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6">Join Our Network!</h1>
            <p className="text-xl">Start your journey to success today</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <SignUp 
            routing="path" 
            path="/register" 
            signInUrl="/login"
            redirectUrl="/onboarding"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary-600 hover:bg-primary-700',
                card: 'bg-white shadow-xl rounded-lg',
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
