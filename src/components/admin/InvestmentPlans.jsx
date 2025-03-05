import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

const AVAILABLE_FEATURES = [
  { id: 'feature1', name: 'Feature 1' },
  { id: 'feature2', name: 'Feature 2' },
  { id: 'feature3', name: 'Feature 3' },
  // Add more features as needed
];

export default function InvestmentPlans() {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    type: 'BASIC', // Basic, Premium, VIP
    status: 'ACTIVE',
    price: 0,
    minAmount: 0,
    maxAmount: 0,
    duration: 30,
    roi: 10,
    features: [],
    commissions: {
      directReferral: 0,
      matrixBonus: 0,
      teamBonus: 0,
      cycleBonus: 0
    },
    eligibility: {
      minRank: 'NONE',
      minReferrals: 0
    },
    customLogic: {
      spilloverEnabled: false,
      fastTrackEnabled: false,
      autoBalanceEnabled: false
    }
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await apiService.getInvestmentPlans();
      setPlans(response.data);
    } catch (error) {
      toast.error('Failed to load investment plans');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.createInvestmentPlan(newPlan);
      toast.success('Investment plan created successfully');
      loadPlans();
      setNewPlan({
        name: '',
        minAmount: '',
        maxAmount: '',
        duration: '',
        roi: '',
        level: 1,
        description: ''
      });
    } catch (error) {
      toast.error('Failed to create investment plan');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Create Investment Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Plan Name"
              value={newPlan.name}
              onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
            />
            <select
              value={newPlan.type}
              onChange={(e) => setNewPlan({...newPlan, type: e.target.value})}
            >
              <option value="BASIC">Basic</option>
              <option value="PREMIUM">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

          {/* Commission Structure */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Direct Referral Commission (%)"
              value={newPlan.commissions.directReferral}
              onChange={(e) => setNewPlan({
                ...newPlan,
                commissions: {
                  ...newPlan.commissions,
                  directReferral: e.target.value
                }
              })}
            />
            <input
              type="number"
              placeholder="Matrix Bonus (%)"
              value={newPlan.commissions.matrixBonus}
              onChange={(e) => setNewPlan({
                ...newPlan,
                commissions: {
                  ...newPlan.commissions,
                  matrixBonus: e.target.value
                }
              })}
            />
          </div>

          {/* Custom Logic */}
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newPlan.customLogic.spilloverEnabled}
                onChange={(e) => setNewPlan({
                  ...newPlan,
                  customLogic: {
                    ...newPlan.customLogic,
                    spilloverEnabled: e.target.checked
                  }
                })}
              />
              <span className="ml-2">Enable Spillover</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newPlan.customLogic.fastTrackEnabled}
                onChange={(e) => setNewPlan({
                  ...newPlan,
                  customLogic: {
                    ...newPlan.customLogic,
                    fastTrackEnabled: e.target.checked
                  }
                })}
              />
              <span className="ml-2">Enable Fast Track</span>
            </label>
          </div>

          {/* Features List */}
          <div className="space-y-2">
            <h3 className="font-semibold">Plan Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_FEATURES.map(feature => (
                <label key={feature.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newPlan.features.includes(feature.id)}
                    onChange={(e) => {
                      const features = e.target.checked
                        ? [...newPlan.features, feature.id]
                        : newPlan.features.filter(f => f !== feature.id);
                      setNewPlan({...newPlan, features});
                    }}
                  />
                  <span className="ml-2">{feature.name}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Plan
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Active Investment Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map(plan => (
            <div key={plan.id} className="border p-4 rounded">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-gray-600">{plan.description}</p>
              <div className="mt-2">
                <p>Min: ${plan.minAmount}</p>
                <p>Max: ${plan.maxAmount}</p>
                <p>Duration: {plan.duration} days</p>
                <p>ROI: {plan.roi}%</p>
                <p>Level: {plan.level}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEditPlan(plan.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlan(plan.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
