import MapProvider from "./context";
import TileLayer from "./tile-layer";

interface Props {}

export default function MapLayer({}: Props) {
  return (
    <div className="absolute inset-0">
      <MapProvider className="h-full w-full"></MapProvider>
    </div>
  );
}
