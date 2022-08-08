import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { forwardGeocode, parseFeatures } from "~/lib/mapbox";

// export const searchAddress = createAsyncThunk(
//   "search/searchAddressStatus",
//   async (address) => {
//     return await forwardGeocode({ address: address });
//   }
// );

const initialState = {
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
  extraReducers: {
    // [searchAddress.pending]: (state) => {
    //   state.loading = true;
    // },
    // [searchAddress.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.results = parseFeatures(action?.payload?.features ?? []);
    // },
  },
});

export const { resetSearch } = searchSlice.actions;

const searchReducer = searchSlice.reducer;
export default searchReducer;
