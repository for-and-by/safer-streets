import * as Redux from "@reduxjs/toolkit";

import { Report } from "~/types/db";

import getIsoNow from "~/lib/get-iso-now";

import reports from "~/store/reports/actions";

interface State {
  pending: {
    sync: boolean;
    upload: boolean;
  };
  lastSynced?: string;
  list: Report[];
}

const initialState: State = {
  pending: {
    sync: false,
    upload: false,
  },
  lastSynced: undefined,
  list: [],
};

const reducer = Redux.createReducer(initialState, (builder) => {
  builder
    .addCase(reports.sync.pending, (state) => {
      state.pending.sync = true;
    })
    .addCase(reports.sync.fulfilled, (state, action) => {
      state.pending.sync = false;

      state.lastSynced = getIsoNow();
      state.list = [...state.list, ...action.payload];
    })
    .addCase(reports.upload.pending, (state) => {
      state.pending.upload = true;
    })
    .addCase(reports.upload.fulfilled, (state, _) => {
      state.pending.upload = false;
    });
});

export default reducer;
