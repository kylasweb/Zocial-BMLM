import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../../../../services/api';
import { useTokenContract } from './useTokenContract';
import { toast } from 'react-toastify';

export function useAirdropManagement(tokenId) {
  const [activeAirdrops, setActiveAirdrops] = useState([]);
  const [airdropHistory, setAirdropHistory] = useState([]);
  const [statistics, setStatistics] = useState({
    totalAirdrops: 0,
    totalDistributed: 0,
    eligibleUsers: 0
  });

  const { contract } = useTokenContract(tokenId);

  const loadAirdropData = useCallback(async () => {
    try {
      const [active, history, stats] = await Promise.all([
        apiService.getActiveAirdrops(tokenId),
        apiService.getAirdropHistory(tokenId),
        apiService.getAirdropStats(tokenId)
      ]);
      
      setActiveAirdrops(active);
      setAirdropHistory(history);
      setStatistics(stats);
    } catch (error) {
      toast.error('Failed to load airdrop data');
    }
  }, [tokenId]);

  const createAirdrop = useCallback(async (airdropData) => {
    try {
      const newAirdrop = await apiService.createAirdrop(tokenId, airdropData);
      setActiveAirdrops(prev => [...prev, newAirdrop]);
      toast.success('Airdrop created successfully');
    } catch (error) {
      toast.error('Failed to create airdrop');
    }
  }, [tokenId]);

  const executeAirdrop = useCallback(async (airdropId) => {
    try {
      const result = await apiService.executeAirdrop(tokenId, airdropId);
      await contract.batchTransfer(result.recipients, result.amounts);
      toast.success('Airdrop executed successfully');
      loadAirdropData();
    } catch (error) {
      toast.error('Failed to execute airdrop');
    }
  }, [tokenId, contract, loadAirdropData]);

  useEffect(() => {
    loadAirdropData();
  }, [loadAirdropData]);

  return {
    activeAirdrops,
    airdropHistory,
    statistics,
    createAirdrop,
    executeAirdrop
  };
}