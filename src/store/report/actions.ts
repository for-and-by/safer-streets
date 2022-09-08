import * as Redux from "@reduxjs/toolkit";

const report = {
  upload: Redux.createAsyncThunk("report/upload", async () => {}),
  list: {
    sync: Redux.createAsyncThunk("report/list/sync", async () => {}),
  },
};

export default report;
