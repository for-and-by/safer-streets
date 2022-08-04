import Leaflet from "leaflet";
import React, { createContext, useState } from "react";
import MapProvider from "./context";
import TileLayer from "./tile-layer";

interface Props {}

export default function MapLayer({}: Props) {
  return (
    <div className="absolute inset-0">
      <MapProvider className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
      </MapProvider>
    </div>
  );
}
