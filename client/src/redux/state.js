// state.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,   // user: { id_user, name, email, role, ... }
  token: null,
  listings: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;      // Full user info from backend
      state.token = action.payload.token;    // JWT token or session
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.listings = null;
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setTripList: (state, action) => {
      if (state.user) state.user.tripList = action.payload;
    },
    setWishList: (state, action) => {
      if (state.user) state.user.wishList = action.payload;
    },
    setPropertyList: (state, action) => {
      if (state.user) state.user.propertyList = action.payload;
    },
    setReservationList: (state, action) => {
      if (state.user) state.user.reservationList = action.payload;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setListings,
  setTripList,
  setWishList,
  setPropertyList,
  setReservationList,
} = userSlice.actions;

export default userSlice.reducer;
