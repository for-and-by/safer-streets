import type { ReactNode } from "react";
import React from "react";

interface Props {
  on: boolean;
  children: ReactNode;
}

export default function Show({ on, children }: Props) {
  if (!on) return null;
  return <>{children}</>;
}
