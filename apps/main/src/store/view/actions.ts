import * as Redux from "@reduxjs/toolkit";

const view = {
  add: Redux.createAction<string>("view/add"),
  remove: Redux.createAction<string>("view/remove"),
  clear: Redux.createAction("view/clear"),
  active: {
    set: Redux.createAction<string>("view/active/set"),
    reset: Redux.createAction("view/active/reset"),
  },
};

export default view;
