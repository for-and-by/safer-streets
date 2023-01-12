import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Listener, LngLatLike, Popup, PopupOptions } from "maplibre-gl";

import useMap from "~/hooks/map/use-map";

interface Props extends PopupOptions {
  coordinates: LngLatLike;
  children?: ReactNode;
  onClose?: Listener;
}

export default function BasePopup({
  coordinates,
  children,
  onClose,
  ...props
}: Props) {
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
      popup.setLngLat(coordinates).setDOMContent(popupRef.current);
      if (onClose) popup.on("close", onClose);
      popup.addTo(map);
    }
  }, [popup, map, coordinates]);

  if (!popup) return null;

  return createPortal(children, popupRef.current);
}
