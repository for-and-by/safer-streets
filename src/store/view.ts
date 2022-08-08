import type { PayloadAction } from "@reduxjs/toolkit";
import { ViewState } from "~/store/types";

import React from "react";
import { createSlice } from "@reduxjs/toolkit";

import { useTypedDispatch, useTypedSelector } from "~/store/hooks";

const initialState: ViewState = {
  list: new Set(["default"]),
  active: "default",
};

export const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    addView: (state, action: PayloadAction<string>) => {
      state.list.add(action.payload);
    },
    removeView: (state, action: PayloadAction<string>) => {
      state.list.delete(action.payload);
    },
    clearViews: (state) => {
      state.list.clear();
    },
    setFocus: (state, action: PayloadAction<string>) => {
      state.active = state.list.has(action.payload)
        ? action.payload
        : state.active;
    },
    resetFocus: (state) => {
      state.active = initialState.active;
    },
  },
});

export const { addView, removeView, clearViews, setFocus, resetFocus } =
  viewSlice.actions;

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
      dispatch(setFocus(viewHandle ?? handle));
    },
  };
}

const viewReducer = viewSlice.reducer;
export default viewReducer;
