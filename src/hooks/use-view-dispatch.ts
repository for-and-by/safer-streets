import { VIEWS } from "~/types/view";

import useTypedDispatch from "~/hooks/use-typed-dispatch";
import view from "~/store/view/actions";

export default function useViewDispatch() {
  const dispatch = useTypedDispatch();

  return {
    active: {
      set: (value: VIEWS) => dispatch(view.active.set(value)),
      reset: () => dispatch(view.active.reset()),
    },
  };
}
