import { createSlice } from '@reduxjs/toolkit';
import ReduxAuthState from '../../models/auth/ReduxAuthState';

const initialState: ReduxAuthState = {
  isAuthenticated: false,
  currentUser: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate } = authSlice.actions;

export default authSlice.reducer;
