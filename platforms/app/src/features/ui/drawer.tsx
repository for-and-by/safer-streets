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
  const [style, setStyle] = React.useState<React.CSSProperties>({
    "--hght": "100%",
  } as React.CSSProperties);

  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (rootRef?.current) {
      const height = rootRef.current.scrollHeight;
      setStyle({ ...style, "--hght": `${height}px` } as React.CSSProperties);
    }
  }, []);

  return (
    <div
      style={style}
      className={clsx(
        "transition-full duration-300",
        position === "bottom" && "rounded-t",
        position === "top" && "rounded-b",
        position === "center" && "rounded",
        show && "pointer-events-auto delay-300 ease-in-out",
        !show && "pointer-events-none max-h-0 ease-in",
        scrollable && show && "max-h-80",
        !scrollable && show && "max-h-[var(--hght)]",
        scrollable && "overflow-y-scroll",
        !scrollable && "overflow-hidden",
        className
      )}
    >
      <div ref={rootRef} className="flex flex-col bg-white">
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
