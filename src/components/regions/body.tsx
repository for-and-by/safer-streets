import { ReactNode } from "react";
import Portal from "~/components/elements/portal";

const REGION_ID = "body";

interface PropsRoot {
  children: ReactNode;
}

function Root({ children }: PropsRoot) {
  return <Portal selector={`#${REGION_ID}`}>{children}</Portal>;
}

function Container() {
  return (
    <div className="rounde overflow-hidded flex flex-col" id={REGION_ID} />
  );
}

const Body = Object.assign(Root, { Container });

export default Body;
