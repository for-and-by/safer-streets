import { useTypedDispatch, useTypedSelector } from "../store/hooks";

import { zoomIn, zoomOut } from "~/store/map";

import MapProvider from "~/components/map/provider";
import Map from "~/components/map/map";
import Controls from "~/components/map/controls";

interface Props {}

export default function Layout({}: Props) {
  const dispatch = useTypedDispatch();

  return (
    <MapProvider>
      <div className="layer z-10">
        <Map className="absolute inset-0"></Map>
      </div>
      <div className="layer clamp pointer-events-none z-20 mx-auto">
        <Controls />
      </div>
    </MapProvider>
  );
}
