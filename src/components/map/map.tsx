import { ComponentProps } from "react";
import clsx from "clsx";

import useMapLock from "~/hooks/use-map-lock";
import useMapRef from "~/hooks/use-map-ref";

interface Props extends ComponentProps<"div"> {}

export default function Map(props: Props) {
  const mapRef = useMapRef();
  const [isLocked] = useMapLock();

  return (
    <>
      <div
        className={clsx("absolute inset-0 z-10", isLocked ? "block" : "hidden")}
      />
      <div ref={mapRef} {...props} />
    </>
  );
}
