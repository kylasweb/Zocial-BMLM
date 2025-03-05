import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../../../../services/api';
import { useTokenContract } from './useTokenContract';
import { toast } from 'react-toastify';

export function useRewardSystem(tokenId) {
  const [rewardConfig, setRewardConfig] = useState({
    achievements: {
      newRank: 100,
      referral: 50,
      stakingMilestone: 200
    },
    pools: {
      leadershipPool: 0.2,
      stakingPool: 0.3,
      referralPool: 0.5
    }
  });

  const [rewardHistory, setRewardHistory] = useState([]);
  const [statistics, setStatistics] = useState({
    totalRewards: 0,
    activeAchievers: 0,
    poolDistribution: {}
  });

  const { contract } = useTokenContract(tokenId);

  const loadRewardData = useCallback(async () => {
    try {
      const [config, history, stats] = await Promise.all([
        apiService.getRewardConfig(tokenId),
        apiService.getRewardHistory(tokenId),
        apiService.getRewardStats(tokenId)
      ]);
      
      setRewardConfig(config);
      setRewardHistory(history);
      setStatistics(stats);
    } catch (error) {
      toast.error('Failed to load reward data');
    }
  }, [tokenId]);

  const updateRewardConfig = useCallback(async (path, value) => {
    try {
      const updatedConfig = await apiService.updateRewardConfig(tokenId, path, value);
      setRewardConfig(updatedConfig);
      toast.success('Reward configuration updated');
    } catch (error) {
      toast.error('Failed to update reward configuration');
    }
  }, [tokenId]);

  const distributeRewards = useCallback(async (rewardType, recipients) => {
    try {
      const distribution = await apiService.calculateRewardDistribution(
        tokenId,
        rewardType,
        recipients
      );
      await contract.batchTransfer(distribution.recipients, distribution.amounts);
      toast.success('Rewards distributed successfully');
      loadRewardData();
    } catch (error) {
      toast.error('Failed to distribute rewards');
    }
  }, [tokenId, contract, loadRewardData]);

  useEffect(() => {
    loadRewardData();
  }, [loadRewardData]);

  return {
    rewardConfig,
    updateRewardConfig,
    rewardHistory,
    statistics,
    distributeRewards
  };
}