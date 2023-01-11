import Map from "~/components/map/map";
import Reports from "~/components/layout/reports";
import MapProvider from "~/components/layout/map/context";
import React from "react";
import CenterMarker from "~/components/map/markers/center";

export default function MapLayer() {
  return (
    <MapProvider>
      <Map className="absolute inset-0">
        <Reports />
        <CenterMarker />
      </Map>
    </MapProvider>
  );
}
