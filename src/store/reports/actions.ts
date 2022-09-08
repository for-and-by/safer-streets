import * as Redux from "@reduxjs/toolkit";
import { Report } from "~/types/db";

import fetchReports from "~/lib/fetch-reports";

const reports = {
  upload: Redux.createAsyncThunk("reports/upload", async () => {}),
  list: {
    sync: Redux.createAsyncThunk<Report[]>("reports/list/sync", async () => {
      return await fetchReports();
    }),
  },
};

export default reports;
