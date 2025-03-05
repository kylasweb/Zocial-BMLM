import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { FiAward, FiCheck, FiStar } from 'react-icons/fi';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    experience: '',
    goals: '',
    preferredWorkTime: '',
    marketingPreference: ''
  });

  const onboardingReward = {
    tokens: 50,
    badge: 'getting-started',
    achievement: 'System Master'
  };

  const tourSteps = [
    {
      title: 'Welcome to Your Dashboard',
      description: 'This is your command center for managing your network and tracking progress.',
      preview: '/assets/dashboard-preview.png',
      features: ['Quick Stats', 'Team Overview', 'Earnings Summary']
    },
    {
      title: 'Gamification Center',
      description: 'Complete challenges and earn rewards as you grow your network.',
      preview: '/assets/gamification-preview.png',
      features: ['Daily Challenges', 'Achievement Badges', 'Leaderboard Rankings']
    },
    {
      title: 'Team Management',
      description: 'Build and manage your team effectively with our powerful tools.',
      preview: '/assets/team-preview.png',
      features: ['Team Structure', 'Performance Metrics', 'Communication Tools']
    }
  ];

  if (!isLoaded) {
    return null;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleAnswerChange = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

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

      // Award onboarding completion rewards
      await fetch('/api/rewards/grant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          reward: {
            type: 'ONBOARDING_COMPLETE',
            tokens: onboardingReward.tokens,
            badge: onboardingReward.badge,
            achievement: onboardingReward.achievement
          }
        })
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
            <h1 className="text-5xl font-bold mb-6">Welcome Aboard!</h1>
            <p className="text-xl mb-4">Complete your profile and earn your first rewards</p>
            <div className="flex items-center space-x-2 text-primary-200">
              <FiAward className="text-2xl" />
              <span>{onboardingReward.tokens} Tokens</span>
              <FiStar className="text-2xl ml-4" />
              <span>"{onboardingReward.achievement}" Badge</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            {currentStep < tourSteps.length ? (
              <>
                <h2 className="text-2xl font-semibold mb-6">{tourSteps[currentStep].title}</h2>
                <img 
                  src={tourSteps[currentStep].preview} 
                  alt={tourSteps[currentStep].title}
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-gray-600 mb-4">{tourSteps[currentStep].description}</p>
                <ul className="mb-6">
                  {tourSteps[currentStep].features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 mb-2">
                      <FiCheck className="text-primary-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    disabled={currentStep === 0}
                    className="px-4 py-2 text-gray-600 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6">Complete Your Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Your MLM Experience</label>
                    <select
                      value={answers.experience}
                      onChange={(e) => handleAnswerChange('experience', e.target.value)}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Your Goals</label>
                    <select
                      value={answers.goals}
                      onChange={(e) => handleAnswerChange('goals', e.target.value)}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="">Select your primary goal</option>
                      <option value="part-time">Part-time Income</option>
                      <option value="full-time">Full-time Career</option>
                      <option value="leadership">Team Leadership</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleComplete}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Complete Setup & Claim Rewards
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
