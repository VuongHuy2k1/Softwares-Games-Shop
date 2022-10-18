import { createSlice } from '@reduxjs/toolkit';

const name = 'wishlist';

const initialState = {
  data: [],
  loaded: false,
  error: false,
};

const wishlistSlice = createSlice({
  name,
  initialState,
  reducers: {
    getWishlist: (state) => {},
    getWishlistSuccess: (state, action) => {
      state.data = action.payload.resultObj;
      state.loaded = true;
    },
    getWishlistFail: (state, action) => {
      state.data = [];
      state.loaded = false;
    },
  },
});

export const { getWishlist, getWishlistSuccess, getWishlistFail } = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const wishlistSelector = (state) => state.wishlist;
