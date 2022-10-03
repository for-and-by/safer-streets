import { useState } from "react";
import useTimeout from "~/hooks/use-timeout";
import useDebounce from "~/hooks/use-debounce";
import useView from "~/hooks/view/use-view";

export default function useViewTransition() {
  const [show, setShow] = useState(true);

  const [view, setView] = useView();
  const debouncedView = useDebounce(view, 300);

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
    [view]
  );

  return {
    view: debouncedView,
    show: show,
  };
}
