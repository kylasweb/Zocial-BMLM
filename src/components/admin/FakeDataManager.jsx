import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiDollarSign, FiActivity, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { useAdmin } from '../../contexts/AdminContext';
import { faker } from '@faker-js/faker';
import { toast } from 'react-toastify';

export default function FakeDataManager() {
  const { stealthActions } = useAdmin();
  const [generationConfig, setGenerationConfig] = useState({
    userCount: 10,
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date()
    },
    activityFrequency: 'medium', // low, medium, high
    investmentRange: {
      min: 1000,
      max: 10000
    },
    rankDistribution: {
      BRONZE: 40,
      SILVER: 30,
      GOLD: 20,
      PLATINUM: 8,
      DIAMOND: 2
    },
    teamStructure: {
      maxDepth: 3,
      maxWidth: 5
    },
    performanceMetrics: {
      activeRate: 0.8,
      conversionRate: 0.6,
      retentionRate: 0.75
    }
  });

  const [fakeUsers, setFakeUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateFakeUser = () => {
    const user = {
      id: `FAKE_${faker.string.uuid()}`,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      joinDate: faker.date.between({
        from: generationConfig.dateRange.start,
        to: generationConfig.dateRange.end
      }),
      avatar: faker.image.avatar(),
      phone: faker.phone.number(),
      country: faker.location.country(),
      rank: selectRandomRank(),
      investments: generateFakeInvestments(),
      activity: generateFakeActivity(),
      team: [],
      performance: generatePerformanceMetrics(),
      metadata: {
        isFake: true,
        generatedAt: new Date(),
        lastUpdated: new Date()
      }
    };

    return user;
  };

  const generateFakeInvestments = () => {
    const investments = [];
    const count = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < count; i++) {
      investments.push({
        id: `INV_${faker.string.uuid()}`,
        amount: faker.number.float({
          min: generationConfig.investmentRange.min,
          max: generationConfig.investmentRange.max,
          precision: 2
        }),
        date: faker.date.recent({ days: 30 }),
        status: faker.helpers.arrayElement(['active', 'completed', 'pending']),
        roi: faker.number.float({ min: 5, max: 15, precision: 2 }),
        type: faker.helpers.arrayElement(['fixed', 'flexible', 'locked'])
      });
    }

    return investments;
  };

  const generateFakeActivity = () => {
    const activities = [];
    const frequency = getActivityFrequency();

    for (let i = 0; i < frequency; i++) {
      activities.push({
        id: `ACT_${faker.string.uuid()}`,
        type: faker.helpers.arrayElement([
          'login', 'referral', 'investment', 'withdrawal', 'rank_up'
        ]),
        timestamp: faker.date.recent({ days: 7 }),
        details: generateActivityDetails(),
        impact: generateActivityImpact()
      });
    }

    return activities;
  };

  const handleGenerateFakeData = async () => {
    try {
      setLoading(true);
      const users = [];
      
      for (let i = 0; i < generationConfig.userCount; i++) {
        const user = generateFakeUser();
        users.push(user);
      }

      // Build team relationships
      buildTeamStructure(users);

      // Insert into stealth storage
      await stealthActions.insertFakeUsers(users);
      
      setFakeUsers(users);
      toast.success(`Generated ${users.length} fake users successfully`);
    } catch (error) {
      toast.error('Failed to generate fake data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Fake Data Generator</h2>
        
        {/* Configuration Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Users
              </label>
              <input
                type="number"
                value={generationConfig.userCount}
                onChange={(e) => setGenerationConfig({
                  ...generationConfig,
                  userCount: parseInt(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            
            {/* Add more configuration fields */}
          </div>
          
          <div className="space-y-4">
            {/* Activity and investment configuration */}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGenerateFakeData}
            disabled={loading}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            {loading ? 'Generating...' : 'Generate Fake Data'}
          </button>
        </div>
      </div>

      {/* Display generated fake users */}
      {fakeUsers.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Generated Fake Users</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table content */}
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}