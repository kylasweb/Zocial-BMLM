import React from 'react';

export default function InvestmentPlanManager() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Investment Plan Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Plan Configuration</h3>
          <PlanSettingsManager
            settings={{
              customLogic: true,
              riskManagement: true,
              returnCalculations: true,
              maturityPeriods: true
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">Reward Structure</h3>
          <RewardSettingsManager
            settings={{
              bonusSystem: true,
              referralRewards: true,
              loyaltyProgram: true,
              specialIncentives: true
            }}
          />
        </div>
      </div>
    </div>
  );
}