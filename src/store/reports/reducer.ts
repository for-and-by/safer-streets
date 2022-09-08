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

      const list = [...state.list, ...action.payload];

      const reportIdMap = list
        .sort((a, b) => {
          if (!(a.updated_at && b.updated_at)) return 0;
          if (new Date(a.updated_at) > new Date(b.updated_at)) {
            return 1;
          } else {
            return -1;
          }
        })
        .reduce((obj, report) => {
          if (!report.id) return obj;
          return Object.assign(obj, { [report.id.toString()]: report });
        }, {});

      // TODO: Handle when reports should expire

      state.list = Object.values(reportIdMap);
    })
    .addCase(reports.upload.pending, (state) => {
      state.pending.upload = true;
    })
    .addCase(reports.upload.fulfilled, (state, _) => {
      state.pending.upload = false;
    });
});

export default reducer;
