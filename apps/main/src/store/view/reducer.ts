import * as Redux from "@reduxjs/toolkit";
import view from "~/store/view/actions";

interface State {
  list: string[];
  active: string;
}

const initialState: State = {
  list: ["default"],
  active: "default",
};

const reducer = Redux.createReducer(initialState, (builder) => {
  builder
    .addCase(view.add, (state, action) => {
      if (!state.list.includes(action.payload)) {
        state.list.push(action.payload);
      }
    })
    .addCase(view.remove, (state, action) => {
      if (state.list.includes(action.payload)) {
        state.list.splice(state.list.indexOf(action.payload));
      }
    })
    .addCase(view.clear, (state) => {
      state.list = initialState.list;
    })
    .addCase(view.active.set, (state, action) => {
      state.active = state.list.includes(action.payload)
        ? action.payload
        : state.active;
    })
    .addCase(view.active.reset, (state) => {
      state.active = initialState.active;
    });
});

export default reducer;
