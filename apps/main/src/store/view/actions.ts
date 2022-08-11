import * as Redux from "@reduxjs/toolkit";
import { VIEWS } from "~/types/view";

const view = {
  active: {
    set: Redux.createAction<VIEWS>("view/active/set"),
    reset: Redux.createAction("view/active/reset"),
  },
};

export default view;
