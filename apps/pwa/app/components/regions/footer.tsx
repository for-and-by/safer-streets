import type { ReactNode } from "react";
import React from "react";
import Portal from "~/components/atoms/portal";
import Bumper from "~/components/atoms/bumper";

const REGION_ID = "footer";

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
        className="pointer-events-auto flex flex-col overflow-hidden rounded-t"
        id={REGION_ID}
      />
    </Bumper>
  );
}

const Footer = Object.assign(Root, { Container });

export default Footer;
