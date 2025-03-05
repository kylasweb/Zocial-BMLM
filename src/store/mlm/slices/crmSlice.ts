import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CRMState } from '../../../types/mlm';

const initialState: CRMState = {
  contacts: [],
  leads: [],
  activities: [],
  loading: false,
  error: null
};

const crmSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<CRMState['contacts']>) => {
      state.contacts = action.payload;
    },
    setLeads: (state, action: PayloadAction<CRMState['leads']>) => {
      state.leads = action.payload;
    },
    setActivities: (state, action: PayloadAction<CRMState['activities']>) => {
      state.activities = action.payload;
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
  setContacts, 
  setLeads, 
  setActivities, 
  setLoading, 
  setError 
} = crmSlice.actions;
export default crmSlice.reducer;