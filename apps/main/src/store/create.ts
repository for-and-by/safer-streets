import type { PayloadAction } from "@reduxjs/toolkit";
import type { LngLatLike } from "maplibre-gl";
import type { CreateState, Details } from "~/components/create/types";

import { createSlice as reduxCreateSlice } from "@reduxjs/toolkit";

import stages from "../components/create/stages";

const initialState: CreateState = {
  submitting: false,
  stage: stages[0],
  submission: {
    coordinates: [],
    details: {},
  },
};

export const createSlice = reduxCreateSlice({
  name: "create",
  initialState,
  reducers: {
    nextStage: (state) => {
      const next = stages.find((stage) => stage.handle === state.stage.next);
      if (next) {
        state.stage = next;
      }
    },
    prevStage: (state) => {
      const prev = stages.find((stage) => stage.next === state.stage.handle);
      if (prev) {
        state.stage = prev;
      }
    },
    saveCenter: (state, action: PayloadAction<LngLatLike>) => {
      state.submission.coordinates = action.payload;
    },
    saveDetails: (state, action: PayloadAction<Details>) => {
      state.submission.details = action.payload;
    },
    saveDetail: (state, action) => {
      state.submission.details = {
        ...state.submission.details,
        ...action.payload,
      };
    },
    clearDetails: (state) => {
      state.submission.details = initialState.submission.details;
    },
    resetCreateData: (state) => {
      state = initialState;
    },
  },
});

export const {
  nextStage,
  prevStage,
  saveCenter,
  saveDetails,
  saveDetail,
  resetCreateData,
} = createSlice.actions;

const createReducer = createSlice.reducer;
export default createReducer;
