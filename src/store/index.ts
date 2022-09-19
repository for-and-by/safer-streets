import { configureStore } from "@reduxjs/toolkit";

import reportsReducer from "~/store/reports/reducer";

// Middleware setup

// Store Creator
const store = configureStore({
  reducer: {
    reports: reportsReducer,
  },
});

export default store;
