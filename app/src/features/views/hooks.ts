import React from "react";
import { useTypedDispatch, useTypedSelector } from "~/features/store/hooks";
import { addView, removeView, setActiveView } from "~/features/views/store";

export function useView(handle: string) {
  const dispatch = useTypedDispatch();
  const activeView = useTypedSelector((state) => state.view.active);

  React.useEffect(() => {
    dispatch(addView(handle));
    return () => {
      dispatch(removeView(handle));
    };
  }, [dispatch, handle]);

  return {
    isActive: handle === activeView,
    isDefaultActive: "default" === activeView,
    setActiveView: (viewHandle: string) => {
      dispatch(setActiveView(viewHandle ?? handle));
    },
  };
}
