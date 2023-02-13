import type { ComponentProps } from "react";
import React from "react";
import Portal from "~/components/atoms/portal";
import Bumper from "~/components/atoms/bumper";

const REGION_ID = "footer";

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
      className="pointer-events-auto flex flex-col overflow-hidden rounded-t"
      id={REGION_ID}
    />
  );
}

const Footer = Object.assign(Root, { Container });

export default Footer;
