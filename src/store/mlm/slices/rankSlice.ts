import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RankState } from '../../../types/mlm';

const initialState: RankState = {
  ranks: [],
  userRanks: {},
  rankHistory: [],
  loading: false,
  error: null
};

const rankSlice = createSlice({
  name: 'ranks',
  initialState,
  reducers: {
    setRanks: (state, action: PayloadAction<RankState['ranks']>) => {
      state.ranks = action.payload;
    },
    setUserRanks: (state, action: PayloadAction<RankState['userRanks']>) => {
      state.userRanks = action.payload;
    },
    setRankHistory: (state, action: PayloadAction<RankState['rankHistory']>) => {
      state.rankHistory = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setRanks, setUserRanks, setRankHistory, setLoading, setError } = rankSlice.actions;
export default rankSlice.reducer;