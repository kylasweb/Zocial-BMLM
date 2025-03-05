import React from 'react';
import { Rank } from '../../../types/mlm';

interface RankAnalyticsProps {
  ranks: Rank[];
}

export const RankAnalytics: React.FC<RankAnalyticsProps> = ({ ranks }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Rank Analytics</h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600">Total Ranks</h4>
          <p className="text-2xl font-bold mt-1">{ranks.length}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600">Highest Commission Rate</h4>
          <p className="text-2xl font-bold mt-1">
            {Math.max(...ranks.map(r => r.benefits.commissionRate))}%
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600">Average Requirements</h4>
          <p className="text-2xl font-bold mt-1">
            {Math.round(ranks.reduce((acc, r) => acc + r.requirements.directReferrals, 0) / ranks.length)}
          </p>
        </div>
      </div>
    </div>
  );
};