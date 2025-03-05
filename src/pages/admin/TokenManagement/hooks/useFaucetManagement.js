import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../../../../services/api';
import { useTokenContract } from './useTokenContract';
import { toast } from 'react-toastify';

export function useFaucetManagement(tokenId) {
  const [faucetConfig, setFaucetConfig] = useState({
    enabled: false,
    claimAmount: 100,
    cooldownPeriod: 24,
    maxClaimsPerUser: 1,
    requiresVerification: true
  });

  const [claimHistory, setClaimHistory] = useState([]);
  const [statistics, setStatistics] = useState({
    totalClaims: 0,
    totalDistributed: 0,
    activeUsers: 0
  });

  const { contract } = useTokenContract(tokenId);

  const loadFaucetData = useCallback(async () => {
    try {
      const [config, history, stats] = await Promise.all([
        apiService.getFaucetConfig(tokenId),
        apiService.getFaucetHistory(tokenId),
        apiService.getFaucetStats(tokenId)
      ]);
      
      setFaucetConfig(config);
      setClaimHistory(history);
      setStatistics(stats);
    } catch (error) {
      toast.error('Failed to load faucet data');
    }
  }, [tokenId]);

  const updateFaucetConfig = useCallback(async (updates) => {
    try {
      const updatedConfig = await apiService.updateFaucetConfig(tokenId, updates);
      setFaucetConfig(updatedConfig);
      toast.success('Faucet configuration updated');
    } catch (error) {
      toast.error('Failed to update faucet configuration');
    }
  }, [tokenId]);

  const processClaim = useCallback(async (userId) => {
    try {
      const claim = await apiService.processFaucetClaim(tokenId, userId);
      await contract.transfer(userId, claim.amount);
      setClaimHistory(prev => [claim, ...prev]);
      toast.success('Claim processed successfully');
    } catch (error) {
      toast.error('Failed to process claim');
    }
  }, [tokenId, contract]);

  useEffect(() => {
    loadFaucetData();
  }, [loadFaucetData]);

  return {
    faucetConfig,
    updateFaucetConfig,
    claimHistory,
    statistics,
    processClaim
  };
}