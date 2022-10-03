import {
  ComponentProps,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import useTimeout from "~/hooks/use-timeout";

interface PropsRoot extends ComponentProps<"div"> {
  show: boolean;
  position: "top" | "center" | "bottom";
  scrollable?: boolean;
}

function Root({
  className = "",
  show = true,
  position = "bottom",
  scrollable = false,
  children,
}: PropsRoot) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
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
  } as CSSProperties;

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
          "flex flex-col divide-y divide-base-100 bg-white",
          position === "bottom" && "justify-start",
          position === "top" && "justify-end"
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface PropsRow extends ComponentProps<"div"> {
  sticky?: boolean;
}

function Row({ sticky = false, className = "", children }: PropsRow) {
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
