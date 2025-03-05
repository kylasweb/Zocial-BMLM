import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  twoFactorEnabled: false,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.role = action.payload?.role || null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setTwoFactorEnabled: (state, action) => {
      state.twoFactorEnabled = action.payload;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { setUser, setToken, setTwoFactorEnabled, logout } = authSlice.actions;
export default authSlice.reducer;