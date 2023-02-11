import { createSlice } from '@reduxjs/toolkit';
import ReduxEstateState from '../../models/estates/ReduxEstateState';

const initialState: ReduxEstateState = {
  isOpenedEstateModal: false,
  isOpenedApplyForEstateModal: false,
  currentEstate: undefined,
  currentEstateApplication: undefined,
  triggeredUpdate: false,
};

export const estateSlice = createSlice({
  name: 'estate',
  initialState,
  reducers: {
    openEstateModal: (state) => {
      state.isOpenedEstateModal = true;
    },
    closeEstateModal: (state) => {
      state.isOpenedEstateModal = false;
    },
    openApplyForEstateModal: (state) => {
      state.isOpenedApplyForEstateModal = true;
    },
    closeApplyForEstateModal: (state) => {
      state.isOpenedApplyForEstateModal = false;
    },
    setCurrentEstate: (state, action) => {
      state.currentEstate = action.payload;
    },
    setCurrentEstateApplication: (state, action) => {
      state.currentEstateApplication = action.payload;
    },
    setUpdatePage: (state) => {
      state.triggeredUpdate = !state.triggeredUpdate;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openEstateModal,
  closeEstateModal,
  setCurrentEstate,
  setUpdatePage,
  openApplyForEstateModal,
  closeApplyForEstateModal,
  setCurrentEstateApplication,
} = estateSlice.actions;

export default estateSlice.reducer;
