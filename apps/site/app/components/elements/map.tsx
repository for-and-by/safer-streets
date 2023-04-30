import { useCallback, useEffect, useState } from "react";
import { Map } from "maplibre-gl";
import { config } from "~/config";

export function SimpleMap() {
  const [map, setMap] = useState<Map | undefined>();
  const ref = useCallback<(node: HTMLDivElement | null) => void>((node) => {
    if (!!node && !map) {
      setMap(
        new Map({
          container: node,
          style: `${config.map.style}?key=${config.map.key}`,
          center: config.map.center.default,
          zoom: config.map.zoom.default,
          dragRotate: false,
          touchPitch: false,
          dragPan: false,
          boxZoom: false,
          scrollZoom: false,
          touchZoomRotate: false,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      map?.remove();
    };
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className="pointer-events-none h-full w-full" />;
}
