import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice';
import rentReducer from './slices/rentSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    rent: rentReducer
  },
})