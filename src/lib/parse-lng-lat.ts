import { LngLatLike } from "maplibre-gl";

export default function parseLngLat(
  value: LngLatLike | number[]
): [number, number] {
  return Array.isArray(value)
    ? [value[0], value[1]]
    : typeof value === "object" && "lon" in value
    ? [value.lon, value.lat]
    : typeof value === "object" && "lng" in value
    ? [value.lng, value.lat]
    : value;
}
