import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommissionState } from '../../../types/mlm';

const initialState: CommissionState = {
  commissions: [],
  commissionRules: {},
  payoutHistory: [],
  loading: false,
  error: null
};

const commissionSlice = createSlice({
  name: 'commissions',
  initialState,
  reducers: {
    setCommissions: (state, action: PayloadAction<CommissionState['commissions']>) => {
      state.commissions = action.payload;
    },
    setCommissionRules: (state, action: PayloadAction<CommissionState['commissionRules']>) => {
      state.commissionRules = action.payload;
    },
    setPayoutHistory: (state, action: PayloadAction<CommissionState['payoutHistory']>) => {
      state.payoutHistory = action.payload;
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
  setCommissions, 
  setCommissionRules, 
  setPayoutHistory, 
  setLoading, 
  setError 
} = commissionSlice.actions;
export default commissionSlice.reducer;