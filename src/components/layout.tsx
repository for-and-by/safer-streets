import { useTypedDispatch, useTypedSelector } from "../store/hooks";

import MapProvider from "~/components/map/provider";
import Map from "~/components/map/map";
import { zoomIn, zoomOut } from "~/store/map";

interface Props {}

export default function Layout({}: Props) {
  const dispatch = useTypedDispatch();

  return (
    <MapProvider>
      <div className="layer z-10">
        <Map className="absolute inset-0"></Map>
      </div>
      <div className="layer clamp z-20">
        <button onClick={() => dispatch(zoomIn())}>Zoom in</button>
        <button onClick={() => dispatch(zoomOut())}>Zoom out</button>
      </div>
    </MapProvider>
  );
}
