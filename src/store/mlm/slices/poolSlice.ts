import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PoolState } from '../../../types/mlm';

const initialState: PoolState = {
  pools: [],
  activePool: null,
  spilloverRules: [],
  poolMetrics: {},
  loading: false,
  error: null
};

const poolSlice = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    setPools: (state, action: PayloadAction<PoolState['pools']>) => {
      state.pools = action.payload;
    },
    setActivePool: (state, action: PayloadAction<PoolState['activePool']>) => {
      state.activePool = action.payload;
    },
    setSpilloverRules: (state, action: PayloadAction<PoolState['spilloverRules']>) => {
      state.spilloverRules = action.payload;
    },
    setPoolMetrics: (state, action: PayloadAction<PoolState['poolMetrics']>) => {
      state.poolMetrics = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setPools, 
  setActivePool, 
  setSpilloverRules, 
  setPoolMetrics, 
  setLoading, 
  setError 
} = poolSlice.actions;
export default poolSlice.reducer;