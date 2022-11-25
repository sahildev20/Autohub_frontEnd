/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: '',
  pickupAddress: null,
  dropAddress: null,
  rideInformation: null,
};

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducer: {
      setUser :(state, action) => {
        state.user = action.payload;
      },
      setPickupAddress :(state, action) => {
        state.pickupAddress = action.payload;
      },
      setDropAddress :(state, action) => {
        state.dropAddress = action.payload;
      },
      setRideInformation:(state, action) => {
        state.rideInformation = action.payload;
      },
    },
});

// export functions to set data here
export const { setUser, setPickupAddress, setDropAddress, setRideInformation } = navSlice.actions;

// export functions to get data from here
export const selectPickupAddress = (state) => state.nav.pickupAddress;
export const selectDropAddress = (state) => state.nav.dropAddress;
export const selectRideInformation = (state) => state.nav.rideInformation;
export const selectUser = (state) => state.nav.user;

// export the default
export default navSlice.reducer;
