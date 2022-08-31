import React from "react";
import useTypedSelector from "~/hooks/use-typed-selector";
import useTimeout from "~/hooks/use-timeout";

export default function useViewTransition() {
  const activeView = useTypedSelector((state) => state.view.active);

  const [renderedView, setRenderedView] = React.useState(activeView);
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    setShow(false);
  }, [activeView]);

  useTimeout(
    () => {
      setShow(true);
      setRenderedView(activeView);
    },
    300,
    [activeView]
  );

  return {
    view: renderedView,
    show: show,
  };
}
