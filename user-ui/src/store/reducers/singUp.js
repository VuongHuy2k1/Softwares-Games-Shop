import { createSlice } from '@reduxjs/toolkit';

const name = 'signUp';

const initialState = {
  data: [],
  loaded: false,
  error: false,
};

const singUpSlice = createSlice({
  name,
  initialState,
  reducers: {
    getSingUpData: (state) => {},
    getSingUpDataSuccess: (state, action) => {
      state.data = action.payload.data;
      state.loaded = true;
    },
    getSingUpDataFail: (state, action) => {},
  },
});

export const { getSingUpData, getSingUpDataSuccess, getSingUpDataFail } = singUpSlice.actions;

export default singUpSlice.reducer;

export const singUpSelector = (state) => state.signUp;
