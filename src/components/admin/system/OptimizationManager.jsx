import React from 'react';

export default function OptimizationManager() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">System Optimization Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Performance Tuning</h3>
          <PerformanceManager
            features={{
              cacheOptimization: true,
              loadBalancing: true,
              resourceAllocation: true,
              scalingRules: true
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">User Engagement</h3>
          <EngagementSettingsManager
            settings={{
              gamification: true,
              rewardOptimization: true,
              userRetention: true,
              growthStrategies: true
            }}
          />
        </div>
      </div>
    </div>
  );
}