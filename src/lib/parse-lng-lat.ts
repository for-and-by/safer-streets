import { LngLatLike } from "maplibre-gl";

export default function parseLngLat(
  value: LngLatLike
): [number, number] | undefined {
  return Array.isArray(value)
    ? value
    : typeof value === "object" && "lon" in value
    ? [value.lon, value.lat]
    : typeof value === "object" && "lng" in value
    ? [value.lng, value.lat]
    : undefined;
}
