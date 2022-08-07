import type { PayloadAction } from "@reduxjs/toolkit";
import { ToastState } from "~/store/types";

import { createSlice } from "@reduxjs/toolkit";

const ERRORS = {};

const initialState: ToastState = {
  content: undefined,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    clearToast: (state) => {
      state.content = initialState.content;
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;

const toastReducer = toastSlice.reducer;
export default toastReducer;
