import type { ComponentProps } from "react";

import { useMapLock } from "~/hooks/map/use-map-lock";
import { useMap } from "~/hooks/map/use-map";
import { clsa } from "~/utils/style";

type Props = ComponentProps<"div">;

export default function Map(props: Props) {
  const { className } = props;

  const { ref } = useMap();
  const [isLocked] = useMapLock();

  return (
    <div
      ref={ref}
      className={clsa(className, isLocked ? "pointer-events-none" : undefined)}
      {...props}
    />
  );
}
