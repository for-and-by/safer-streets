import React from "react";
import useTimeout from "~/hooks/use-timeout";
import useDebounce from "~/hooks/use-debounce";
import { useViewContext } from "~/contexts/view";

export default function useViewTransition() {
  const { activeView } = useViewContext();
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
