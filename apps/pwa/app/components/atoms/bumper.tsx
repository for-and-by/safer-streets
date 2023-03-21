import type { ReactNode } from "react";
import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import useMutationObserver from "~/hooks/use-mutation-observer";

interface Props {
  show?: boolean;
  children?: ReactNode;
  className?: string;
}

export default function Bumper({ show = true, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ height }, api] = useSpring(() => ({
    height: 0,
  }));

  let timer: NodeJS.Timeout;
  useMutationObserver(
    (mutations) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        for (const mutation of mutations) {
          if (mutation.type === "childList") {
            api.start({
              height: show ? ref?.current?.offsetHeight : 0,
            });
          }
        }
      }, 10);
    },
    ref,
    [show]
  );

  useEffect(() => {
    if (ref.current) {
      api.start({
        height: show ? ref.current.offsetHeight : 0,
      });
    }
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <animated.div
      style={{
        height: height.to((value) => `${value}px`),
      }}
      className="overflow-hidden bg-white"
    >
      <div ref={ref} className={className}>
        {children}
      </div>
    </animated.div>
  );
}
