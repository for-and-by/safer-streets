import type { PayloadAction } from "@reduxjs/toolkit";
import { ViewState } from "~/features/store/types";

import React from "react";
import { createSlice } from "@reduxjs/toolkit";

import { useTypedDispatch, useTypedSelector } from "~/features/store/hooks";

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

export function useView(handle: string) {
  const dispatch = useTypedDispatch();
  const activeView = useTypedSelector((state) => state.view.active);

  React.useEffect(() => {
    dispatch(addView(handle));
    return () => {
      dispatch(removeView(handle));
    };
  }, [dispatch, handle]);

  return {
    isActive: handle === activeView,
    isDefaultActive: "default" === activeView,
    setActiveView: (viewHandle: string) => {
      dispatch(setActiveView(viewHandle ?? handle));
    },
  };
}

const viewReducer = viewSlice.reducer;
export default viewReducer;
