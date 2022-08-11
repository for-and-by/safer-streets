import React from "react";
import clsx from "clsx";

interface Props {
  Root: {
    className?: string;
    show: boolean;
    position: "top" | "center" | "bottom";
    scrollable?: boolean;
    children?: React.ReactNode;
  };
  Row: {
    sticky?: boolean;
    className?: string;
    children?: React.ReactNode;
  };
}

function Root({
  className = "",
  show = true,
  position = "bottom",
  scrollable = false,
  children,
}: Props["Root"]) {
  const [height, setHeight] = React.useState<number>(0);

  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (rootRef?.current) {
      setHeight(rootRef.current.clientHeight);
    }
  }, [show]);

  const style = {
    "--height": `${height}px`,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className={clsx(
        "transition-all duration-300",
        position === "bottom" && "rounded-t",
        position === "top" && "rounded-b",
        position === "center" && "rounded",
        show && "pointer-events-auto h-[var(--height)] ease-in-out",
        !show && "pointer-events-none h-0 ease-in",
        scrollable && "overflow-y-scroll max-h-96",
        !scrollable && "overflow-hidden",
        className
      )}
    >
      <div
        ref={rootRef}
        className={clsx(
          "flex flex-col bg-white",
          position === "bottom" && "justify-start",
          position === "top" && "justify-end"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Row({ sticky = false, className = "", children }: Props["Row"]) {
  return (
    <div
      className={clsx(
        "flex flex-row items-center space-x-1 bg-white",
        sticky && "sticky top-0",
        className
      )}
    >
      {children}
    </div>
  );
}

const Drawer = Object.assign(Root, { Row });
export default Drawer;
