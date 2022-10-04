import { ReactNode, useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import useResizeObserver from "~/hooks/use-resize-observer";

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

  useResizeObserver(ref?.current ?? undefined, (height) => {
    if (show) {
      api.start({ height: height.blockSize });
    }
  });

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
      className="overflow-hidden"
    >
      <div ref={ref} className={className}>
        {children}
      </div>
    </animated.div>
  );
}
