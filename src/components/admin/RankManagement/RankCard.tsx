import React from 'react';
import { Rank } from '../../../types/mlm';

interface RankCardProps {
  rank: Rank;
  onSelect: () => void;
  isSelected: boolean;
}

export const RankCard: React.FC<RankCardProps> = ({ rank, onSelect, isSelected }) => {
  return (
    <div 
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{rank.name}</h3>
        <span className="px-2 py-1 bg-gray-100 rounded text-sm">
          Level {rank.level}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="text-gray-600">Direct Referrals:</span>
          <span className="ml-2 font-medium">{rank.requirements.directReferrals}</span>
        </div>
        <div>
          <span className="text-gray-600">Group Volume:</span>
          <span className="ml-2 font-medium">${rank.requirements.groupVolume}</span>
        </div>
        <div>
          <span className="text-gray-600">Commission Rate:</span>
          <span className="ml-2 font-medium">{rank.benefits.commissionRate}%</span>
        </div>
      </div>
    </div>
  );
};