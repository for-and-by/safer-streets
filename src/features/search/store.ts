import { SearchState } from "~/features/search/types";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { geocode } from "~/features/search/helpers";

export const runSearch = createAsyncThunk(
  "search/runStatus",
  async (address: string) => {
    return await geocode(address);
  }
);

const initialState: SearchState = {
  loading: false,
  results: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(runSearch.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(runSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload;
    });
  },
});

export const { resetSearch } = searchSlice.actions;

const searchReducer = searchSlice.reducer;
export default searchReducer;
