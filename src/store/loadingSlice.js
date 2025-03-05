import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    globalLoading: false,
    loadingStates: {},
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    setLoadingState: (state, action) => {
      const { key, isLoading } = action.payload;
      state.loadingStates[key] = isLoading;
    },
  },
});

export const { setGlobalLoading, setLoadingState } = loadingSlice.actions;
export default loadingSlice.reducer;