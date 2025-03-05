import { createSlice } from '@reduxjs/toolkit';
import { 
  RankState, PoolState, 
  CommissionState, CRMState 
} from '../../types/mlm';
import * as actions from './actions';

const rankSlice = createSlice({
  name: 'ranks',
  initialState: {
    ranks: [],
    userRanks: {},
    rankHistory: [],
    loading: false,
    error: null
  } as RankState,
  reducers: {
    // Synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.fetchRanks.pending, (state) => {
        state.loading = true;
      })
      .addCase(actions.fetchRanks.fulfilled, (state, action) => {
        state.ranks = action.payload;
        state.loading = false;
      })
      .addCase(actions.fetchRanks.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  }
});

const poolSlice = createSlice({
  name: 'pools',
  initialState: {
    pools: [],
    activePool: null,
    spilloverRules: [],
    poolMetrics: {},
    loading: false,
    error: null
  } as PoolState,
  reducers: {
    setActivePool: (state, action) => {
      state.activePool = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.fetchPools.fulfilled, (state, action) => {
        state.pools = action.payload;
        state.loading = false;
      });
  }
});

// Similar slices for commissions and CRM...