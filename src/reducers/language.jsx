import { createSlice } from "@reduxjs/toolkit";

const initialState = { lang: "en" };

export const languageSlice = createSlice({
    name: "languagechange",
    // initialStateValue,
    initialState,
    reducers: {
        languageChange: (state, action) => {
            state.lang = action.payload;
        },
        languageDefault: (state) => {
            state = initialState
        },
    },
});

export const { languageChange, languageDefault } = languageSlice.actions;

export default languageSlice.reducer;