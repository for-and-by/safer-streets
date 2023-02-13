import type { ComponentProps } from "react";
import React from "react";
import Portal from "~/components/elements/portal";
import Bumper from "~/components/elements/bumper";

const REGION_ID = "header";

type PropsRoot = ComponentProps<typeof Bumper>;

function Root(props: PropsRoot) {
  return (
    <Portal selector={`#${REGION_ID}`}>
      <Bumper {...props} />
    </Portal>
  );
}

function Container() {
  return (
    <div
      className="pointer-events-auto flex flex-col overflow-hidden rounded-b"
      id={REGION_ID}
    />
  );
}

const Header = Object.assign(Root, { Container });

export default Header;
