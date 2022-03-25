import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state,action) => {
      state.isFetching = false;
      state.error = false
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    signout: (state) => {
      state.currentUser = null
    },
  },
});

export const { loginStart, loginFailure, loginSuccess, signout } = userSlice.actions;
export default userSlice.reducer;
