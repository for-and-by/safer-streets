import type { StoreStartListening } from "~/features/store/types";
import type { SearchState } from "~/features/search/types";

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
  show: false,
  results: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.show = false;
    },
    clearResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(runSearch.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(runSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.show = true;
      state.results = action.payload;
    });
  },
});

export const { resetSearch, clearResults } = searchSlice.actions;

export function addSearchListeners(startListening: StoreStartListening) {
  startListening({
    actionCreator: resetSearch,
    effect: (_, { getState, dispatch }) => {
      const state = getState();
      if (!state.search.show) {
        console.log(state);
        setTimeout(() => {
          dispatch(clearResults());
        }, 600);
      }
    },
  });
}

const searchReducer = searchSlice.reducer;
export default searchReducer;
