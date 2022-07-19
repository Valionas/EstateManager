import { createSlice } from '@reduxjs/toolkit'

export const rentSlice = createSlice({
    name: 'rent',
    initialState: {
        isOpenedRentModal: false,
        isOpenedRequestRentModal: false
    },
    reducers: {
        openRentModal: (state, action) => {
            state.isOpenedRentModal = true
        },
        closeRentModal: (state, action) => {
            state.isOpenedRentModal = false
        },
        openRequestRentModal: (state, action) => {
            state.isOpenedRequestRentModal = true
        },
        closeRequestRentModal: (state, action) => {
            state.isOpenedRequestRentModal = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { openRentModal, closeRentModal, openRequestRentModal, closeRequestRentModal } = rentSlice.actions

export default rentSlice.reducer