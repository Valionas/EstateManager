import { createSlice } from '@reduxjs/toolkit'

export const rentSlice = createSlice({
    name: 'rent',
    initialState: {
        isOpenedRentModal: false,
    },
    reducers: {
        openRentModal: (state, action) => {
            state.isOpenedRentModal = true
        },
        closeRentModal: (state, action) => {
            state.isOpenedRentModal = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { openRentModal, closeRentModal } = rentSlice.actions

export default rentSlice.reducer