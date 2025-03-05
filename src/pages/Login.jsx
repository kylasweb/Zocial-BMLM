import { useNavigate } from 'react-router-dom';
import { SignIn, useUser } from '@clerk/clerk-react';

export default function Login() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    navigate('/dashboard');
    return null;
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
          <SignIn 
            routing="path" 
            path="/login" 
            signUpUrl="/register"
            redirectUrl="/dashboard"
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
