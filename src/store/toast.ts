import type { PayloadAction } from "@reduxjs/toolkit";
import { StoreStartListening, ToastState } from "~/store/types";

import { createSlice } from "@reduxjs/toolkit";

const ERRORS = {};

const initialState: ToastState = {
  content: undefined,
  show: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToastContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    clearToastContent: (state) => {
      state.content = initialState.content;
    },
    showToast: (state) => {
      state.show = true;
    },
    hideToast: (state) => {
      state.show = false;
    },
  },
});

export const { showToast, hideToast, setToastContent, clearToastContent } =
  toastSlice.actions;

export function addToastListeners(startListening: StoreStartListening) {
  startListening({
    actionCreator: setToastContent,
    effect: (_, { dispatch }) => {
      dispatch(showToast());
    },
  });

  startListening({
    actionCreator: hideToast,
    effect: (_, { dispatch }) => {
      setTimeout(() => {
        dispatch(clearToastContent());
      }, 1000);
    },
  });
}

const toastReducer = toastSlice.reducer;
export default toastReducer;
