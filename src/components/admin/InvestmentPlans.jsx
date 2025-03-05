import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

export default function InvestmentPlans() {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    name: '',
    minAmount: '',
    maxAmount: '',
    duration: '',
    roi: '',
    level: 1,
    description: ''
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
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Plan Name"
              value={newPlan.name}
              onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Minimum Amount"
              value={newPlan.minAmount}
              onChange={(e) => setNewPlan({...newPlan, minAmount: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Maximum Amount"
              value={newPlan.maxAmount}
              onChange={(e) => setNewPlan({...newPlan, maxAmount: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Duration (days)"
              value={newPlan.duration}
              onChange={(e) => setNewPlan({...newPlan, duration: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="ROI (%)"
              value={newPlan.roi}
              onChange={(e) => setNewPlan({...newPlan, roi: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <select
              value={newPlan.level}
              onChange={(e) => setNewPlan({...newPlan, level: e.target.value})}
              className="border p-2 rounded"
            >
              {[1,2,3,4,5].map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Plan Description"
            value={newPlan.description}
            onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
            className="border p-2 rounded w-full"
            rows="3"
          />
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