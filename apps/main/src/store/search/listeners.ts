import type { StoreStartListening } from "~/types/store";

import search from "~/store/search/actions";

export default function addSearchListeners(
  startListening: StoreStartListening
) {
  startListening({
    actionCreator: search.results.hide,
    effect(_, { getState, dispatch }) {
      const state = getState();
      if (!state.search.show) {
        setTimeout(() => {
          dispatch(search.results.clear());
        }, 600);
      }
    },
  });
}
