import { useState } from 'react';
import { useRank } from '../../../contexts/RankContext';
import { motion } from 'framer-motion';

export default function RankManager() {
  const { 
    ranks, 
    rankRequirements, 
    rankStats,
    updateRequirements 
  } = useRank();
  const [selectedRank, setSelectedRank] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rank Management</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedRank(null)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg"
          >
            Create New Rank
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RankStatsCard stats={rankStats} />
        <RankProgressionCard ranks={ranks} />
        <RequirementsCard 
          requirements={rankRequirements}
          onUpdate={updateRequirements}
        />
      </div>

      <RankList
        ranks={ranks}
        selectedRank={selectedRank}
        onRankSelect={setSelectedRank}
      />

      {selectedRank && (
        <RankEditor
          rank={selectedRank}
          requirements={rankRequirements}
          onUpdate={updateRequirements}
        />
      )}
    </div>
  );
}

function RankStatsCard({ stats }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Rank Statistics</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total Promotions:</span>
          <span className="font-medium">{stats.totalPromotions}</span>
        </div>
        <div className="flex justify-between">
          <span>Avg. Time to Promote:</span>
          <span className="font-medium">{stats.averageTimeToPromote} days</span>
        </div>
      </div>
    </div>
  );
}

// Additional components would go here...