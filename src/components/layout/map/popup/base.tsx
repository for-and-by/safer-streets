import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Listener, LngLatLike, Popup, PositionAnchor } from "maplibre-gl";

import useMap from "~/hooks/map/use-map";

interface Props {
  coordinates: LngLatLike;
  children?: ReactNode;
  className?: string;
  icon?: string;
  text?: string;
  onDragEnd?: Listener;
  onDragStart?: Listener;
  draggable?: boolean;
  anchor?: PositionAnchor;
}

export default function BasePopup({ coordinates, children }: Props) {
  const popupRef = useRef(document.createElement("div"));
  const [popup, setPopup] = useState<Popup | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!popup) {
      setPopup(new Popup());
    }
  }, [popup]);

  useEffect(() => {
    if (!!map && !!popup) {
      popup.setLngLat(coordinates).setDOMContent(popupRef.current).addTo(map);
    }
  }, [popup, map]);

  useEffect(() => {
    if (popup) {
      popup.setLngLat(coordinates);
    }
  }, [popup, coordinates]);

  if (!popup) return null;

  return createPortal(<>{children}</>, popupRef.current);
}
