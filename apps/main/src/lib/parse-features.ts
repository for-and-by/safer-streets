import type { SearchFeature, SearchResult } from "~/types/search";
import parseContextAsString from "~/lib/parse-content-as-string";

export default function parseFeatures(
  features: SearchResult[]
): SearchFeature[] {
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
