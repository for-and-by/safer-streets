import type { SearchFeature } from "~/types/search";

import * as Redux from "@reduxjs/toolkit";
import search from "~/store/search/actions";

interface State {
  loading: boolean;
  show: boolean;
  results: SearchFeature[];
}

const initialState: State = {
  loading: false,
  show: false,
  results: [],
};

const reducer = Redux.createReducer(initialState, (builder) => {
  builder
    .addCase(search.results.show, (state) => {
      state.show = true;
    })
    .addCase(search.results.hide, (state) => {
      state.show = false;
    })
    .addCase(search.results.clear, (state) => {
      state.results = initialState.results;
    })
    .addCase(search.results.fetch.pending, (state) => {
      state.loading = true;
    })
    .addCase(search.results.fetch.fulfilled, (state, action) => {
      state.loading = false;
      state.show = true;
      state.results = action.payload;
    });
});

export default reducer;
