import { ReactNode, useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import useMutationObserver from "~/hooks/use-mutation-observer";

interface Props {
  show: boolean;
  children?: ReactNode;
  className?: string;
}

export default function Bumper({ show, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ height }, api] = useSpring(() => ({
    height: 0,
  }));

  useMutationObserver(
    (mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          console.log("mutated");
          api.start({ height: show ? ref?.current?.offsetHeight : 0 });
        }
      }
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
