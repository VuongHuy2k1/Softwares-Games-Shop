import { createSlice } from '@reduxjs/toolkit';

const name = 'checkout';

const initialState = {
  data: [],
  loaded: false,
  error: false,
};

const checkoutSlice = createSlice({
  name,
  initialState,
  reducers: {
    getCheckout: (state) => {},
    getCheckoutSuccess: (state, action) => {
      state.data = action.payload.items;
      state.loaded = true;
    },
    getCheckoutFail: (state, action) => {
      state.data = [];
      state.loaded = false;
    },
  },
});

export const { getCheckout, getCheckoutSuccess, getCheckoutFail } = checkoutSlice.actions;

export default checkoutSlice.reducer;

export const checkoutSelector = (state) => state.checkout;
