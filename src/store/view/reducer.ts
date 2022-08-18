import * as Redux from "@reduxjs/toolkit";
import view from "~/store/view/actions";
import { VIEWS } from "~/types/view";

interface State {
  active: VIEWS;
}

const initialState: State = {
  active: VIEWS.HOME,
};

const reducer = Redux.createReducer(initialState, (builder) => {
  builder
    .addCase(view.active.set, (state, action) => {
      state.active = action.payload;
    })
    .addCase(view.active.reset, (state) => {
      state.active = initialState.active;
    });
});

export default reducer;
