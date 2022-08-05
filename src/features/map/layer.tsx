import Map from "./context";

interface Props {}

export default function MapLayer({}: Props) {
  return (
    <div className="absolute inset-0">
      <Map className="h-full w-full" />
    </div>
  );
}
