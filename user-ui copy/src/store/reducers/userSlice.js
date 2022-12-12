import { createSlice } from '@reduxjs/toolkit';

const name = 'user';

const initialState = {
  data: undefined,
  loaded: false,
  error: false,
};

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    getUserData: (state) => {},
    getUserDataSuccess: (state, action) => {
      state.data = action.payload.resultObj;
      state.loaded = true;
    },
    getUserDataFail: (state, action) => {},
  },
});

export const { getUserData, getUserDataSuccess, getUserDataFail } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user;
