import { TYPES } from "@safer-streets/db";
import { useRef } from "react";
import clsx from "clsx";

type Props = {
  type: TYPES;
  className?: string;
};

export function TypeIcon({ type, className }: Props) {
  const icon = useRef(
    (() => {
      switch (type) {
        case TYPES.BUSHFIRE:
          return "icon-bushfire";
        case TYPES.CYCLIST:
          return "icon-cyclist";
        case TYPES.FLOOD:
          return "icon-flood";
        case TYPES.MOTORIST:
          return "icon-motorist";
        case TYPES.PEDESTRIAN:
          return "icon-pedestrian";
        case TYPES.WILDLIFE:
          return "icon-wildlife";
        default:
          return "";
      }
    })()
  );

  return <i className={clsx("icon", icon.current, className)} />;
}
