import type { PayloadAction } from "@reduxjs/toolkit";
import { ViewState } from "~/features/store/types";

import { createSlice } from "@reduxjs/toolkit";

const initialState: ViewState = {
  list: ["default"],
  active: "default",
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    addView: (state, action: PayloadAction<string>) => {
      if (!state.list.includes(action.payload)) {
        state.list.push(action.payload);
      }
    },
    removeView: (state, action: PayloadAction<string>) => {
      if (state.list.includes(action.payload)) {
        state.list.splice(state.list.indexOf(action.payload), 1);
      }
    },
    clearViews: (state) => {
      state.list = initialState.list;
    },
    setActiveView: (state, action: PayloadAction<string>) => {
      state.active = state.list.includes(action.payload)
        ? action.payload
        : state.active;
    },
    resetActiveView: (state) => {
      state.active = initialState.active;
    },
  },
});

export const {
  addView,
  removeView,
  clearViews,
  setActiveView,
  resetActiveView,
} = viewSlice.actions;

const viewReducer = viewSlice.reducer;
export default viewReducer;
