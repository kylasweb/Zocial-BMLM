import { configureStore } from '@reduxjs/toolkit';
import rankReducer from './mlm/slices/rankSlice';
import poolReducer from './mlm/slices/poolSlice';
import commissionReducer from './mlm/slices/commissionSlice';
import crmReducer from './mlm/slices/crmSlice';

export const store = configureStore({
  reducer: {
    ranks: rankReducer,
    pools: poolReducer,
    commissions: commissionReducer,
    crm: crmReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;