import { createSlice } from '@reduxjs/toolkit';
import ReduxRentState from '../../models/rents/ReduxRentState';

const initialState: ReduxRentState = {
  isOpenedRentModal: false,
  isOpenedRequestRentModal: false,
  isOpenedReviewRentModal: false,
  currentRent: undefined,
  currentRentReview: undefined,
  currentRentRequest: undefined,
  triggeredUpdate: false,
};

export const rentSlice = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    openRentModal: (state) => {
      state.isOpenedRentModal = true;
    },
    closeRentModal: (state) => {
      state.isOpenedRentModal = false;
    },
    openRequestRentModal: (state) => {
      state.isOpenedRequestRentModal = true;
    },
    closeRequestRentModal: (state) => {
      state.isOpenedRequestRentModal = false;
    },
    openReviewRentModal: (state) => {
      state.isOpenedReviewRentModal = true;
    },
    closeReviewRentModal: (state) => {
      state.isOpenedReviewRentModal = false;
    },
    setCurrentRent: (state, action) => {
      state.currentRent = action.payload;
    },
    setCurrentRentReview: (state, action) => {
      state.currentRentReview = action.payload;
    },
    setCurrentRentRequest: (state, action) => {
      state.currentRentRequest = action.payload;
    },
    setUpdatePage: (state) => {
      state.triggeredUpdate = !state.triggeredUpdate;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openRentModal,
  closeRentModal,
  openRequestRentModal,
  closeRequestRentModal,
  openReviewRentModal,
  closeReviewRentModal,
  setCurrentRent,
  setCurrentRentReview,
  setUpdatePage,
  setCurrentRentRequest,
} = rentSlice.actions;

export default rentSlice.reducer;
