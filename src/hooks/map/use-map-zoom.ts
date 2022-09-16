import { useMapSelector } from "~/components/map/provider";

export default function useMapZoom() {
  const [zoom, setZoom] = useMapSelector((value) => value.useZoom);

  return {
    value: zoom,
    set: setZoom,
    in: () => setZoom((prev) => (prev ? prev + 0.5 : prev)),
    out: () => setZoom((prev) => (prev ? prev - 0.5 : prev)),
  };
}
