import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [answers, setAnswers] = useState({});

  if (!isLoaded) {
    return null;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleComplete = async () => {
    try {
      // Update user metadata with onboarding answers
      await user.update({
        publicMetadata: {
          ...user.publicMetadata,
          onboardingCompleted: true,
          ...answers
        }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="w-full flex items-center justify-center p-12">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6">Let's Get Started!</h1>
            <p className="text-xl">Complete your profile to unlock all features</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Profile Setup</h2>
            {/* Add your onboarding form fields here */}
            <button 
              onClick={handleComplete}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
            >
              Complete Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
