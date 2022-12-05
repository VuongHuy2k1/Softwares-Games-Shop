import { createSlice } from '@reduxjs/toolkit';

const name = 'signUp';

const initialState = {
  data: [],
  loaded: false,
  error: false,
};

const signUpSlice = createSlice({
  name,
  initialState,
  reducers: {
    getSignUpData: (state) => {},
    getSignUpDataSuccess: (state, action) => {
      state.data = action.payload.data;
      state.loaded = true;
    },
    getSignUpDataFail: (state, action) => {},
  },
});

export const { getSignUpData, getSignUpDataSuccess, getSignUpDataFail } = signUpSlice.actions;

export default signUpSlice.reducer;

export const signUpSelector = (state) => state.signUp;
