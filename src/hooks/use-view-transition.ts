import React from "react";
import useTypedSelector from "~/hooks/use-typed-selector";
import useTimeout from "~/hooks/use-timeout";
import useDebounce from "~/hooks/use-debounce";

export default function useViewTransition() {
  const activeView = useTypedSelector((state) => state.view.active);
  const debouncedView = useDebounce(activeView, 300);
  const [show, setShow] = React.useState(true);

  useTimeout(
    {
      onStart: () => {
        setShow(false);
      },
      onEnd: () => {
        setShow(true);
      },
      duration: 300,
    },
    [activeView]
  );

  return {
    view: debouncedView,
    show: show,
  };
}
