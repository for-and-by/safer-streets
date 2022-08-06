import React from "react";
import ReactDOM from "react-dom";

interface Props {
  children?: React.ReactNode;
}

export default function Portal({ children }: Props) {
  const ref = React.useRef<Element | null>(null);

  React.useEffect(() => {
    ref.current = document.querySelector("#root");
  }, []);

  if (!ref.current) return null;
  return ReactDOM.createPortal(children, ref.current);
}
