import useMapLayer from "~/hooks/map/use-map-layer";
import colors from "~/lib/colors";
import useMapEvents from "~/hooks/map/use-map-events";
import useMap from "~/hooks/map/use-map";
import useMapCenter from "~/hooks/map/use-map-center";

export default function ReportIconsLayer() {
  const map = useMap();
  const [, setCenter] = useMapCenter();

  useMapLayer({
    id: "reports-bg",
    type: "circle",
    source: "reports",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": colors?.brand[600],
      "circle-radius": 20,
    },
  });

  useMapLayer({
    id: "reports-icon",
    type: "symbol",
    source: "reports",
    filter: ["!", ["has", "point_count"]],
    layout: {
      "icon-image": "{type_handle}",
      "icon-size": 0.2,
    },
  });

  useMapEvents(map, "reports-bg", {
    click: (event) => {
      setCenter(event.lngLat);
    },
  });

  return null;
}
