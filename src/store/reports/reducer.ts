import * as Redux from "@reduxjs/toolkit";

import { Report } from "~/types/db";

import getIsoNow from "~/lib/get-iso-now";

import reports from "~/store/reports/actions";

interface State {
  syncing: boolean;
  lastSynced?: string;
  list: Report[];
}

const initialState: State = {
  syncing: false,
  lastSynced: undefined,
  list: [],
};

const reducer = Redux.createReducer(initialState, (builder) => {
  builder
    .addCase(reports.list.sync.pending, (state) => {
      state.syncing = true;
    })
    .addCase(reports.list.sync.fulfilled, (state, action) => {
      state.lastSynced = getIsoNow();
      state.syncing = false;
      state.list = [...state.list, ...action.payload];
    });
});

export default reducer;
