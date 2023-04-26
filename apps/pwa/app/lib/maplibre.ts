import type { LngLatLike } from "maplibre-gl";
import type { Feature, FeatureCollection } from "geojson";

import { config } from "~/config";

import type {
  ContextItem,
  ContextObject,
  SearchFeature,
  SearchResult,
} from "~/types/search";

import type { Report, ReportResult } from "@safer-streets/db";

export function parseContextAsString(context: ContextItem[]) {
  const contextObj = context.reduce((obj, feature) => {
    if (feature?.id) {
      const [type, id] = feature.id.split(".");
      return Object.assign(obj, {
        [type]: {
          ...feature,
          type,
          id,
        },
      });
    } else {
      return obj;
    }
  }, {} as ContextObject);

  return [
    contextObj?.street?.text ??
      contextObj?.municipality?.text ??
      contextObj?.joint_municipality?.text ??
      contextObj.place?.text ??
      null,
    contextObj?.region?.text ?? null,
    contextObj?.postal_code?.text ?? null,
  ]
    .filter((i) => !!i)
    .join(", ");
}

export function parseFeatureAsAddress(feature: SearchResult) {
  return [feature?.address ?? null, feature?.text ?? null]
    .filter((i) => !!i)
    .join(" ");
}

export function parseLngLat(value: LngLatLike | number[]): [number, number] {
  return Array.isArray(value)
    ? [value[0], value[1]]
    : typeof value === "object" && "lon" in value
    ? [value.lon, value.lat]
    : typeof value === "object" && "lng" in value
    ? [value.lng, value.lat]
    : value;
}

export async function geocode(
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

export function parseReportsAsGeoJSON(
  reports: ReportResult[],
  callback: (report: Report) => Feature
): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: reports.map((report) => callback(report)),
  };
}
