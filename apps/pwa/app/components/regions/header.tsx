import type { ReactNode } from "react";
import React from "react";
import { Portal } from "~/components/atoms/portal";
import { Bumper } from "~/components/atoms/bumper";

const REGION_ID = "header";

interface PropsRoot {
  children: ReactNode;
}

function Root({ children }: PropsRoot) {
  return <Portal selector={`#${REGION_ID}`}>{children}</Portal>;
}

function Container() {
  return (
    <Bumper>
      <div
        className="pointer-events-auto flex flex-col overflow-hidden rounded-b"
        id={REGION_ID}
      />
    </Bumper>
  );
}

const Header = Object.assign(Root, { Container });

export default Header;
