import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  Rank, Pool, Commission, Customer, 
  RankRequirements, SpilloverRule 
} from '../../types/mlm';

// Rank Actions
export const fetchRanks = createAsyncThunk(
  'ranks/fetchRanks',
  async () => {
    const response = await api.getRanks();
    return response.data;
  }
);

export const updateRankRequirements = createAsyncThunk(
  'ranks/updateRequirements',
  async (payload: { rankId: string; requirements: RankRequirements }) => {
    const response = await api.updateRankRequirements(payload);
    return response.data;
  }
);

// Pool Actions
export const fetchPools = createAsyncThunk(
  'pools/fetchPools',
  async () => {
    const response = await api.getPools();
    return response.data;
  }
);

export const updateSpilloverRules = createAsyncThunk(
  'pools/updateSpilloverRules',
  async (payload: { poolId: string; rules: SpilloverRule[] }) => {
    const response = await api.updateSpilloverRules(payload);
    return response.data;
  }
);

// Commission Actions
export const calculateCommissions = createAsyncThunk(
  'commissions/calculate',
  async (payload: { userId: string; amount: number; type: string }) => {
    const response = await api.calculateCommissions(payload);
    return response.data;
  }
);

// CRM Actions
export const fetchCustomers = createAsyncThunk(
  'crm/fetchCustomers',
  async () => {
    const response = await api.getCustomers();
    return response.data;
  }
);