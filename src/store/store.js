import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice';
import rentReducer from './slices/rentSlice';
import estateReducer from './slices/estateSlice';



export default configureStore({
  reducer: {
    auth: authReducer,
    rent: rentReducer,
    estate: estateReducer
  },
})