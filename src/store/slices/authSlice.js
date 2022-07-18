import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true
    },
  },
})

// Action creators are generated for each case reducer function
export const { authenticate } = authSlice.actions

export default authSlice.reducer