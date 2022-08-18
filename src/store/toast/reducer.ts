import * as Redux from "@reduxjs/toolkit";
import toast from "~/store/toast/actions";

interface State {
  content?: string;
  show: boolean;
}

const initialState: State = {
  content: undefined,
  show: false,
};

const reducer = Redux.createReducer(initialState, (builder) => {
  builder
    .addCase(toast.show, (state) => {
      state.show = true;
    })
    .addCase(toast.hide, (state) => {
      state.show = false;
    })
    .addCase(toast.content.set, (state, action) => {
      state.content = action.payload;
    })
    .addCase(toast.content.clear, (state) => {
      state.content = initialState.content;
    });
});

export default reducer;
