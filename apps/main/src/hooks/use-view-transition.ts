import React from "react";
import useTypedSelector from "~/hooks/use-typed-selector";

export default function useViewTransition() {
  const activeView = useTypedSelector((state) => state.view.active);

  const [renderedView, setRenderedView] = React.useState(activeView);
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    setShow(false);

    const timeout = setTimeout(() => {
      setShow(true);
      setRenderedView(activeView);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeView]);

  return {
    view: renderedView,
    show: show,
  };
}
