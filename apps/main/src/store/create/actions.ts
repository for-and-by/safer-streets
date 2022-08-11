import * as Redux from "@reduxjs/toolkit";

const create = {
  stage: {
    next: Redux.createAction("create/stage/next"),
    prev: Redux.createAction("create/stage/prev"),
  },
  details: {
    set: Redux.createAction("create/details/set"),
    clear: Redux.createAction("create/details/clear"),
  },
  detail: {
    set: Redux.createAction("create/detail/set"),
  },
};

export default create;
