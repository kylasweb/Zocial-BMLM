import { useState } from 'react';
import { motion } from 'framer-motion';

export default function InvestmentPlanManager() {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);

  const defaultPlan = {
    name: '',
    minInvestment: 0,
    maxInvestment: 0,
    duration: 30,
    roi: 0,
    levels: [
      { level: 1, commission: 10 },
      { level: 2, commission: 5 },
      { level: 3, commission: 3 }
    ],
    status: 'active'
  };

  const handleAddPlan = () => {
    setEditingPlan({ ...defaultPlan });
  };

  const handleSavePlan = (plan) => {
    if (plan.id) {
      setPlans(plans.map(p => p.id === plan.id ? plan : p));
    } else {
      setPlans([...plans, { ...plan, id: Date.now() }]);
    }
    setEditingPlan(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Investment Plans</h2>
        <button
          onClick={handleAddPlan}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">{plan.name}</h3>
            <div className="space-y-2">
              <p>Investment Range: ${plan.minInvestment} - ${plan.maxInvestment}</p>
              <p>Duration: {plan.duration} days</p>
              <p>ROI: {plan.roi}%</p>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Commission Levels</h4>
                {plan.levels.map(level => (
                  <p key={level.level}>
                    Level {level.level}: {level.commission}%
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {editingPlan && (
        <PlanEditor
          plan={editingPlan}
          onSave={handleSavePlan}
          onCancel={() => setEditingPlan(null)}
        />
      )}
    </div>
  );
}

function PlanEditor({ plan, onSave, onCancel }) {
  const [formData, setFormData] = useState(plan);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-4">
          {plan.id ? 'Edit Plan' : 'Create New Plan'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Plan Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          {/* Add more form fields for other plan properties */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}