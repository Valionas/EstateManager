import { createSlice } from '@reduxjs/toolkit'

export const estateSlice = createSlice({
    name: 'estate',
    initialState: {
        isOpenedEstateModal: false,
        isOpenedApplyForEstateModal: false,
        currentEstate: undefined,
        triggeredUpdate: false,
    },
    reducers: {
        openEstateModal: (state, action) => {
            state.isOpenedEstateModal = true
        },
        closeEstateModal: (state, action) => {
            state.isOpenedEstateModal = false
        },
        openApplyForEstateModal: (state, action) => {
            state.isOpenedApplyForEstateModal = true
        },
        closeApplyForEstateModal: (state, action) => {
            state.isOpenedApplyForEstateModal = false
        },
        setCurrentEstate: (state, action) => {
            state.currentEstate = action.payload;
        },
        setUpdatePage: (state, action) => {
            state.triggeredUpdate = !state.triggeredUpdate;
        }
    },
})

// Action creators are generated for each case reducer function
export const { openEstateModal, closeEstateModal, setCurrentEstate, setUpdatePage, openApplyForEstateModal, closeApplyForEstateModal } = estateSlice.actions

export default estateSlice.reducer