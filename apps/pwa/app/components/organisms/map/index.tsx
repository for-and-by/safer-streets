import type { ComponentProps } from "react";

import useMapRef from "~/hooks/map/use-map-ref";

import useMapLock from "~/hooks/map/use-map-lock";

type Props = ComponentProps<"div">;

export default function Map(props: Props) {
  const mapRef = useMapRef();
  const [isLocked] = useMapLock();

  return (
    <>
      <div
        className={`absolute inset-0 z-10 ${isLocked ? "block" : "hidden"}`}
      />
      <div ref={mapRef} {...props} />
    </>
  );
}
