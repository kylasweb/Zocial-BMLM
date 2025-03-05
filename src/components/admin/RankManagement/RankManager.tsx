import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchRanks, 
  updateRankRequirements 
} from '../../../store/mlm/actions';
import { RootState } from '../../../store';
import { Rank, RankRequirements } from '../../../types/mlm';

export const RankManager: React.FC = () => {
  const dispatch = useDispatch();
  const { ranks, loading, error } = useSelector(
    (state: RootState) => state.ranks
  );
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null);
  const [requirements, setRequirements] = useState<RankRequirements | null>(null);

  useEffect(() => {
    dispatch(fetchRanks());
  }, [dispatch]);

  const handleRequirementsUpdate = async () => {
    if (selectedRank && requirements) {
      await dispatch(updateRankRequirements({
        rankId: selectedRank.id,
        requirements
      }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Rank Management</h2>

      {/* Rank List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ranks.map(rank => (
          <RankCard
            key={rank.id}
            rank={rank}
            onSelect={() => setSelectedRank(rank)}
            isSelected={selectedRank?.id === rank.id}
          />
        ))}
      </div>

      {/* Requirements Editor */}
      {selectedRank && (
        <RankRequirementsEditor
          rank={selectedRank}
          requirements={requirements}
          onUpdate={setRequirements}
          onSave={handleRequirementsUpdate}
        />
      )}

      {/* Rank Analytics */}
      <RankAnalytics ranks={ranks} />

      {/* Promotion Rules */}
      <PromotionRulesEditor 
        rank={selectedRank}
        onUpdate={handleRequirementsUpdate}
      />
    </div>
  );
};

// Additional components...