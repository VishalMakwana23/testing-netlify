import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false
};

export const menuSlice = createSlice({
  name: "headerMenu",
  initialState,
  reducers: {
    setDarkMode(state, action) {
      state.darkMode = action.payload;
    },
    LoginHeadMenuList(state, action) {
      state.LoginHeadList = action.payload;
    },
    LoginHeadMenuSe(state, action) {
      state.LoginMenuSe = action.payload;
    },
    resetMenu: () => initialState,
  },
});

export const {  LoginHeadMenuList, LoginHeadMenuSe, resetMenu, setDarkMode } =
  menuSlice.actions;

export default menuSlice.reducer;
