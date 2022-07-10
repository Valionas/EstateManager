import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    isLogged: false,
  },
  reducers: {
    login: (state) => {
      state.value -= 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { login } = authSlice.actions

export default authSlice.reducer