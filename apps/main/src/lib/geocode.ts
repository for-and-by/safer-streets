import config from "~/config";
import parseFeatures from "~/lib/parse-features";

export default async function geocode(query: [number, number] | string) {
  const url = new URL(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(
      typeof query === "string" ? query : `${query[0]},${query[1]}`
    )}.json`
  );

  url.search = new URLSearchParams({
    key: config.map.key,
    bbox: config.map.bbox.join(","),
  }).toString();

  const response = await fetch(url.toString());
  const json = await response.json();
  return parseFeatures(json.features);
}
