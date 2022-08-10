import type {
  ContextItem,
  ContextObject,
  SearchFeature,
  SearchResult,
} from "~/features/search/types";
import config from "~/config";

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
      contextObj?.subcity?.text ??
      contextObj.place?.text ??
      null,
    contextObj?.state?.text ?? null,
    contextObj?.country?.text ?? null,
    contextObj?.postcode?.text ?? null,
  ]
    .filter((i) => !!i)
    .join(", ");
}

export function parseFeatures(features: SearchResult[]): SearchFeature[] {
  return features.map((feature) => {
    console.log(feature);
    return {
      center: feature?.center,
      type: feature?.place_type?.[0],
      heading: feature?.place_name?.split(", ")[0] ?? "",
      subheading: parseContextAsString(feature?.context ?? []),
    };
  });
}

export async function geocode(query: [number, number] | string) {
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
