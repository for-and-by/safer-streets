import type { ReactNode } from "react";
import React from "react";
import Portal from "~/components/atoms/portal";

const REGION_ID = "body";

interface PropsRoot {
  children: ReactNode;
}

function Root({ children }: PropsRoot) {
  return <Portal selector={`#${REGION_ID}`}>{children}</Portal>;
}

function Container() {
  return (
    <div
      className="pointer-events-auto my-2 flex flex-col overflow-hidden rounded"
      id={REGION_ID}
    />
  );
}

const Body = Object.assign(Root, { Container });

export default Body;
