import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DeleteData: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    DeleteDataFor(state, action) {
      state.DeleteData = action.payload;
    },
    resetCommon: () => initialState,
  },
});

export const { DeleteDataFor, resetCommon } = commonSlice.actions;

export default commonSlice.reducer;
