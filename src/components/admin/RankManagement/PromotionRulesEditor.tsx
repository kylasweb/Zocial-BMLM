import React, { useState } from 'react';
import { Rank } from '../../../types/mlm';

interface PromotionRulesEditorProps {
  rank: Rank | null;
  onUpdate: () => void;
}

export const PromotionRulesEditor: React.FC<PromotionRulesEditorProps> = ({
  rank,
  onUpdate,
}) => {
  const [autoPromote, setAutoPromote] = useState(true);
  const [gracePeriod, setGracePeriod] = useState(30);

  if (!rank) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Promotion Rules</h3>

      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={autoPromote}
              onChange={(e) => setAutoPromote(e.target.checked)}
              className="rounded"
            />
            <span>Auto-promote when requirements are met</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grace Period (days)
          </label>
          <input
            type="number"
            value={gracePeriod}
            onChange={(e) => setGracePeriod(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div className="mt-6">
          <button
            onClick={onUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Rules
          </button>
        </div>
      </div>
    </div>
  );
};