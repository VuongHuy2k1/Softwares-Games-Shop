import { createSlice } from '@reduxjs/toolkit';

const name = 'cart';

const initialState = {
  data: [],
  loaded: false,
  error: false,
};

const cartSlice = createSlice({
  name,
  initialState,
  reducers: {
    getCart: (state) => {},
    getCartSuccess: (state, action) => {
      state.data = action.payload.resultObj;
      state.loaded = true;
    },
    getCartFail: (state, action) => {
      state.data = [];
      state.loaded = false;
    },
  },
});

export const { getCart, getCartSuccess, getCartFail } = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
