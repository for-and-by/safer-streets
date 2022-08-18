import type { StoreStartListening } from "~/types/store";

import toast from "~/store/toast/actions";

export default function addToastListeners(startListening: StoreStartListening) {
  startListening({
    actionCreator: toast.content.set,
    effect(_, { dispatch }) {
      dispatch(toast.show());
    },
  });

  startListening({
    actionCreator: toast.hide,
    effect(_, { dispatch }) {
      setTimeout(() => {
        dispatch(toast.content.clear());
      }, 1000);
    },
  });
}
