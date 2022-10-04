import { ReactNode } from "react";
import { createPortal } from "react-dom";

import useQuerySelector from "~/hooks/use-query-selector";

interface Props {
  children?: ReactNode;
  selector?: string;
}

export default function Portal({ children, selector = "#root" }: Props) {
  const parent = useQuerySelector(selector);
  if (!parent) return null;

  return createPortal(children, parent);
}
