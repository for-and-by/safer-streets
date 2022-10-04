import { ReactNode } from "react";
import Portal from "~/components/elements/portal";

const REGION_ID = "footer";

interface PropsRoot {
  children: ReactNode;
}

function Root({ children }: PropsRoot) {
  return <Portal selector={`#${REGION_ID}`}>{children}</Portal>;
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
