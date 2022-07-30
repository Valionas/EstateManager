import { createSlice } from '@reduxjs/toolkit'

export const estateSlice = createSlice({
    name: 'estate',
    initialState: {
        isOpenedEstateModal: false,
        currentEstate: undefined,
        currentRentReview: undefined,
        triggeredUpdate: false,
    },
    reducers: {
        openEstateModal: (state, action) => {
            state.isOpenedEstateModal = true
        },
        closeEstateModal: (state, action) => {
            state.isOpenedEstateModal = false
        },
        setCurrentEstate: (state, action) => {
            state.currentRent = action.payload;
        },
        setUpdatePage: (state, action) => {
            state.triggeredUpdate = !state.triggeredUpdate;
        }
    },
})

// Action creators are generated for each case reducer function
export const { openEstateModal, closeEstateModal, setCurrentEstate, setUpdatePage } = estateSlice.actions

export default estateSlice.reducer