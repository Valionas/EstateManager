import { createSlice } from '@reduxjs/toolkit'

export const rentSlice = createSlice({
    name: 'rent',
    initialState: {
        isOpenedRentModal: false,
        isOpenedRequestRentModal: false,
        isOpenedReviewRentModal: false,
        currentRent: {},
        triggeredUpdate: false,
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
        openReviewRentModal: (state, action) => {
            state.isOpenedReviewRentModal = true
        },
        closeReviewRentModal: (state, action) => {
            state.isOpenedReviewRentModal = false
        },
        setCurrentRent: (state, action) => {
            state.currentRent = action.payload;
        },
        setUpdatePage: (state, action) => {
            state.triggeredUpdate = !state.triggeredUpdate;
        }
    },
})

// Action creators are generated for each case reducer function
export const { openRentModal, closeRentModal, openRequestRentModal, closeRequestRentModal, openReviewRentModal, closeReviewRentModal, setCurrentRent, setUpdatePage } = rentSlice.actions

export default rentSlice.reducer