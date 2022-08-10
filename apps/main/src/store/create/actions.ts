import * as Redux from "@reduxjs/toolkit";

const create = {
  stage: {
    next: Redux.createAction("create/stage/next"),
    prev: Redux.createAction("create/stage/prev"),
  },
};

export default create;
