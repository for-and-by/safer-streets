import type { Stage, SubmitData } from "~/types/create";

import * as Redux from "@reduxjs/toolkit";

import create from "~/store/create/actions";
import stages from "~/data/stages";

interface State {
  stage: Stage;
  data: SubmitData;
}

const initialState: State = {
  stage: stages[0],
  data: {
    coordinates: undefined,
    details: {},
  },
};

const reducer = Redux.createReducer(initialState, (builder) => {
  builder
    .addCase(create.stage.next, (state) => {
      const next = stages.find((stage) => state.stage.next === stage.handle);
      if (next) {
        state.stage = next;
      }
    })
    .addCase(create.stage.prev, (state) => {
      const prev = stages.find((stage) => state.stage.handle === stage.next);
      if (prev) {
        state.stage = prev;
      }
    })
    .addCase(create.stage.reset, (state) => {
      state.stage = stages[0];
    });
});

export default reducer;
