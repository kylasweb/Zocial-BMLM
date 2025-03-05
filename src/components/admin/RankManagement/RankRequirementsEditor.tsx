import React from 'react';
import { Rank, RankRequirements } from '../../../types/mlm';

interface RankRequirementsEditorProps {
  rank: Rank;
  requirements: RankRequirements | null;
  onUpdate: (requirements: RankRequirements) => void;
  onSave: () => void;
}

export const RankRequirementsEditor: React.FC<RankRequirementsEditorProps> = ({
  rank,
  requirements,
  onUpdate,
  onSave,
}) => {
  const handleInputChange = (field: keyof RankRequirements, value: number) => {
    if (requirements) {
      onUpdate({
        ...requirements,
        [field]: value,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Edit Requirements for {rank.name}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Personal Volume
            </label>
            <input
              type="number"
              value={requirements?.personalVolume || 0}
              onChange={(e) => handleInputChange('personalVolume', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Group Volume
            </label>
            <input
              type="number"
              value={requirements?.groupVolume || 0}
              onChange={(e) => handleInputChange('groupVolume', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Direct Referrals
            </label>
            <input
              type="number"
              value={requirements?.directReferrals || 0}
              onChange={(e) => handleInputChange('directReferrals', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Active Downlines
            </label>
            <input
              type="number"
              value={requirements?.activeDownlines || 0}
              onChange={(e) => handleInputChange('activeDownlines', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Leg Count
            </label>
            <input
              type="number"
              value={requirements?.minimumLegCount || 0}
              onChange={(e) => handleInputChange('minimumLegCount', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Requirements
        </button>
      </div>
    </div>
  );
};