import { SignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp 
        routing="path" 
        path="/register" 
        signInUrl="/login"
        redirectUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: 'bg-primary-600 hover:bg-primary-700',
            card: 'bg-white shadow-xl rounded-lg',
          }
        }}
      />
    </div>
  );
}