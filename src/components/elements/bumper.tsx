import { CSSProperties, ReactNode, useEffect, useRef } from "react";
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
      console.log("blockSize:", height.blockSize);
      api.start({ height: height.blockSize });
    }
  });

  useEffect(() => {
    console.log("offsetHeight:", ref?.current?.offsetHeight, show);
    api.start({
      height: show ? ref?.current?.offsetHeight : 0,
    });
  }, [show]);

  const style = {
    "--height": height.to((value) => `${value}px`).get(),
  } as CSSProperties;

  console.log(height.get());

  return (
    <animated.div style={style} className="h-[var(--height)]">
      <div ref={ref} className={className}>
        {children}
      </div>
    </animated.div>
  );
}
