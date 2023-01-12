import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LngLatLike, Popup, PopupOptions } from "maplibre-gl";

import useMap from "~/hooks/map/use-map";

interface Props extends PopupOptions {
  coordinates: LngLatLike;
  children?: ReactNode;
}

export default function BasePopup({ coordinates, children, ...props }: Props) {
  const popupRef = useRef(document.createElement("div"));
  const [popup, setPopup] = useState<Popup | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!popup) {
      setPopup(new Popup(props));
    }
  }, [popup]);

  useEffect(() => {
    if (!!map && !!popup) {
      popup.setLngLat(coordinates).setDOMContent(popupRef.current).addTo(map);
    }
  }, [popup, map, coordinates]);

  if (!popup) return null;

  return createPortal(children, popupRef.current);
}
