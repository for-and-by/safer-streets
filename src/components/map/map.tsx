import { ComponentProps } from "react";
import clsx from "clsx";

import useMapLock from "~/hooks/use-map-lock";
import { useMapContext } from "~/contexts/map";

export default function Map(props: ComponentProps<"div">) {
  const { ref } = useMapContext();
  const { value: isLocked } = useMapLock();

  return (
    <>
      <div
        className={clsx("absolute inset-0 z-10", isLocked ? "block" : "hidden")}
      />
      <div ref={ref} {...props} />
    </>
  );
}
