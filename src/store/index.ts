import { configureStore } from "@reduxjs/toolkit";

import viewReducer from "~/store/view/reducer";
import reportsReducer from "~/store/reports/reducer";

// Middleware setup

// Store Creator
const store = configureStore({
  reducer: {
    view: viewReducer,
    reports: reportsReducer,
  },
});

export default store;
