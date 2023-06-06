import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { useStyleVars } from "~/hooks/use-style-vars";

interface Props {
  isShow?: boolean;
  children?: ReactNode;
  className?: string;
}

export function Bumper(props: Props) {
  const { isShow = true, className, children } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    if (!isShow) return setHeight(0);

    const { current: node } = ref;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          setHeight(node.offsetHeight);
        }
      }
    });

    observer.observe(node, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [isShow]);

  const style = useStyleVars({
    height: `${height}px`,
  });

  return (
    <div
      style={style}
      className="h-[--height] overflow-hidden bg-white transition-all duration-300"
    >
      <div ref={ref} className={className}>
        {children}
      </div>
    </div>
  );
}
