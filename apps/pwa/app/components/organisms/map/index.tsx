import type { ComponentProps } from "react";

import { useMapLock } from "~/hooks/map/use-map-lock";
import { useMap } from "~/hooks/map/use-map";

type Props = ComponentProps<"div">;

export default function Map(props: Props) {
  const { ref } = useMap();
  const [isLocked] = useMapLock();

  return (
    <div
      ref={ref}
      {...props}
      className={isLocked ? "pointer-events-none" : undefined}
    />
  );
}
