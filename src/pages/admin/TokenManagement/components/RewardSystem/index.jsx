import { useState } from 'react';
import { useRewardSystem } from '../../hooks/useRewardSystem';

export default function RewardSystem({ tokenId }) {
  const {
    rewardConfig,
    updateRewardConfig,
    rewardHistory,
    statistics
  } = useRewardSystem(tokenId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Reward System</h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Achievement Rewards</h4>
          <div className="space-y-4">
            <FormField
              label="New Rank Reward"
              value={rewardConfig.achievements.newRank}
              onChange={(value) => updateRewardConfig('achievements.newRank', value)}
              type="number"
            />
            <FormField
              label="Referral Reward"
              value={rewardConfig.achievements.referral}
              onChange={(value) => updateRewardConfig('achievements.referral', value)}
              type="number"
            />
            <FormField
              label="Staking Milestone"
              value={rewardConfig.achievements.stakingMilestone}
              onChange={(value) => updateRewardConfig('achievements.stakingMilestone', value)}
              type="number"
            />
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Pool Distribution</h4>
          <div className="space-y-4">
            <FormField
              label="Leadership Pool"
              value={rewardConfig.pools.leadershipPool}
              onChange={(value) => updateRewardConfig('pools.leadershipPool', value)}
              type="number"
              step="0.1"
            />
            <FormField
              label="Staking Pool"
              value={rewardConfig.pools.stakingPool}
              onChange={(value) => updateRewardConfig('pools.stakingPool', value)}
              type="number"
              step="0.1"
            />
            <FormField
              label="Referral Pool"
              value={rewardConfig.pools.referralPool}
              onChange={(value) => updateRewardConfig('pools.referralPool', value)}
              type="number"
              step="0.1"
            />
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-medium mb-2">Statistics</h4>
          <div className="space-y-2">
            <Stat label="Total Rewards" value={statistics.totalRewards} />
            <Stat label="Active Achievers" value={statistics.activeAchievers} />
            <Stat label="Pool Distribution" value={statistics.poolDistribution} />
          </div>
        </div>
      </div>

      <RewardHistory history={rewardHistory} />
    </div>
  );
}