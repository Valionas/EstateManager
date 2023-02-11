import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import rentReducer from './slices/rentSlice';
import estateReducer from './slices/estateSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rent: rentReducer,
    estate: estateReducer,
  },
});

export type ReduxState = ReturnType<typeof store.getState>;
