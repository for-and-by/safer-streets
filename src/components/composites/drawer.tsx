import React from "react";
import clsx from "clsx";
import useTimeout from "~/hooks/use-timeout";

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
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  const [height, setHeight] = React.useState<string>("0px");

  React.useEffect(() => {
    setHeight(`${rootRef?.current?.clientHeight ?? 0}px`);
  }, [show]);

  useTimeout(
    {
      onEnd: () => {
        if (show) {
          setTimeout(() => {
            setHeight("auto");
          }, 300);
        } else {
          setHeight("0px");
        }
      },
      duration: 10,
    },
    [height]
  );

  const style = {
    "--height": height,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className={clsx(
        "bg-white transition-all duration-300 ease-in-out",
        position === "bottom" && "rounded-t",
        position === "top" && "rounded-b",
        position === "center" && "rounded",
        show && "pointer-events-auto",
        !show && "pointer-events-none",
        scrollable && "h-96 overflow-y-scroll",
        !scrollable && "h-[var(--height)] overflow-hidden",
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