import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  LoginDetails: { authenticate: false },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    LoginUser(state, action) {
      state.LoginDetails = action.payload;
    },

    resetLogin: () => initialState,
  },
});

export const { LoginUser, resetLogin } = loginSlice.actions;

export default loginSlice.reducer;
