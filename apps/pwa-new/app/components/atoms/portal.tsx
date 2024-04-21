import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import useQuerySelector from "~/hooks/use-query-selector";

type Props = {
  children?: ReactNode;
  selector?: string;
};

export function Portal(props: Props) {
  const { children, selector = "body" } = props;
  const parent = useQuerySelector(selector);

  if (!parent) return null;
  return createPortal(children, parent);
}
