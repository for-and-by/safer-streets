import * as Redux from "@reduxjs/toolkit";

const toast = {
  content: {
    set: Redux.createAction<string>("toast/content/set"),
    clear: Redux.createAction("toast/content/clear"),
  },
};

export default toast;
