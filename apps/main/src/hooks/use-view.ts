import React from "react";

import view from "~/store/view/actions";
import useTypedDispatch from "~/hooks/use-typed-dispatch";
import useTypedSelector from "~/hooks/use-typed-selector";

export default function useView(handle: string) {
  const dispatch = useTypedDispatch();
  const activeView = useTypedSelector((state) => state.view.active);

  React.useEffect(() => {
    dispatch(view.add(handle));
    return () => {
      dispatch(view.remove(handle));
    };
  }, [dispatch, handle]);

  return {
    isActive: handle === activeView,
    isDefaultActive: "default" === activeView,
    setActiveView: (viewHandle: string) => {
      dispatch(view.active.set(viewHandle ?? handle));
    },
  };
}
