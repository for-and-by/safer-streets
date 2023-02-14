import type { LngLatLike } from "maplibre-gl";

import { config } from "~/config";
import parseLngLat from "~/lib/parse-lng-lat";
import parseFeatureAsAddress from "~/lib/parse-feature-as-address";
import parseContextAsString from "~/lib/parse-content-as-string";
import type { SearchFeature, SearchResult } from "~/types/search";

export default async function geocode(
  query: LngLatLike | string
): Promise<SearchFeature[]> {
  const parsedQuery =
    typeof query !== "string"
      ? parseLngLat(query)?.join(",") ?? undefined
      : query;

  if (!parsedQuery)
    throw new Error("Provided query was not useable for search");

  const url = new URL(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(parsedQuery)}.json`
  );

  url.search = new URLSearchParams({
    key: config.map.key,
    bbox: config.map.bbox.join(","),
  }).toString();

  const response = await fetch(url.toString());
  const json = (await response.json()) as any;

  return (
    json?.features?.map((feature: SearchResult) => {
      return {
        center: feature?.center,
        type: feature?.place_type?.[0],
        heading: parseFeatureAsAddress(feature),
        subheading: parseContextAsString(feature?.context ?? []),
      };
    }) ?? []
  );
}
