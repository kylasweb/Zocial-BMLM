import { useState, useEffect } from 'react';
import { usePool } from '../../../contexts/PoolContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart } from 'react-chartjs-2';

export default function PoolManager() {
  const { 
    pools, 
    activePool, 
    spilloverRules, 
    poolStats,
    addPool,
    updatePool,
    setActivePool,
    updateSpilloverRules 
  } = usePool();

  const [showNewPoolModal, setShowNewPoolModal] = useState(false);

  const handleCreatePool = (poolData) => {
    addPool({
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'active',
      ...poolData
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pool Management</h2>
        <button
          onClick={() => setShowNewPoolModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg"
        >
          Create New Pool
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PoolStatsCard stats={poolStats} />
        <ActivePoolsCard pools={pools} />
        <SpilloverRulesCard 
          rules={spilloverRules}
          onUpdate={updateSpilloverRules}
        />
      </div>

      <PoolList 
        pools={pools}
        activePool={activePool}
        onPoolSelect={setActivePool}
        onPoolUpdate={updatePool}
      />

      <AnimatePresence>
        {showNewPoolModal && (
          <NewPoolModal
            onClose={() => setShowNewPoolModal(false)}
            onSubmit={handleCreatePool}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PoolStatsCard({ stats }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Pool Statistics</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total Volume:</span>
          <span className="font-medium">${stats.totalVolume.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Active Participants:</span>
          <span className="font-medium">{stats.activeParticipants}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Rewards:</span>
          <span className="font-medium">${stats.totalRewards.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// Additional components would go here...