import * as Redux from "@reduxjs/toolkit";

import geocode from "~/lib/geocode";

const search = {
  results: {
    show: Redux.createAction("search/show"),
    hide: Redux.createAction("search/hide"),
    clear: Redux.createAction("search/results/clear"),
    fetch: Redux.createAsyncThunk(
      "search/results/fetch",
      async (address: string) => {
        return await geocode(address);
      }
    ),
  },
};

export default search;
