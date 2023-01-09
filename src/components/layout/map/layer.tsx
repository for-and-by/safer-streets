import Map from "~/components/map/map";
import Reports from "~/components/layout/reports";
import CenterMarker from "~/components/map/markers/center";
import MapProvider from "~/components/layout/map/context";
import React from "react";

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
