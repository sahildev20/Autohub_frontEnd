/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: false,
  pickupAddress: [],
  pickupPlace: 'Enter pickup location',
  dropAddress: [],
  dropPlace: 'Enter drop location',
  rideInformation: [],
  emptyLocation: true,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPickupAddress: (state, action) => {
      state.pickupAddress = action.payload;
    },
    setPickupPlace: (state, action) => {
      state.pickupPlace = action.payload;
    },
    setDropAddress: (state, action) => {
      state.dropAddress = action.payload;
    },
    setDropPlace: (state, action) => {
      state.dropPlace = action.payload;
    },
    setRideInformation: (state, action) => {
      state.rideInformation = action.payload;
    },
    setEmptyLocation: (state, action) => {
      state.emptyLocation = action.payload;
    },
  },
});

// export functions to set data here
export const {
  setUser,
  setPickupAddress,
  setDropAddress,
  setRideInformation,
  setEmptyLocation,
  setDropPlace,
  setPickupPlace,
} = navSlice.actions;

// export functions to get data from here
export const selectPickupAddress = (state) => state.nav.pickupAddress;
export const selectDropAddress = (state) => state.nav.dropAddress;
export const selectRideInformation = (state) => state.nav.rideInformation;
export const selectUser = (state) => state.nav.user;
export const selectEmptyLocation = (state) => state.nav.emptyLocation;
export const selectDropPlace = (state) => state.nav.dropPlace;
export const selectPickupPlace = (state) => state.nav.pickupPlace;

// export the default
export default navSlice.reducer;
