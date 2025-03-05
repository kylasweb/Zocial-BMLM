import React from 'react';

export default function CompensationManager() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Compensation System Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Binary Matrix Configuration</h3>
          <MatrixSettingsManager
            settings={{
              levels: 10,
              spilloverPools: {
                enabled: true,
                autoOptimization: true,
                smartDistribution: true
              },
              followSponsor: {
                enabled: true,
                intelligentPlacement: true,
                teamBalancing: true
              }
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">Fast Track Bonuses</h3>
          <BonusSettingsManager
            settings={{
              quickStart: true,
              leadershipRanks: true,
              performanceMultipliers: true,
              teamAcceleration: true
            }}
          />
        </div>
      </div>
    </div>
  );
}