import type { SearchFeature, SearchResult } from "~/types/search";
import parseContextAsString from "~/lib/parse-content-as-string";
import parseFeatureAsAddress from "~/lib/parse-feature-as-address";

export default function parseFeatures(
  features: SearchResult[]
): SearchFeature[] {
  return features.map((feature) => {
    return {
      center: feature?.center,
      type: feature?.place_type?.[0],
      heading: parseFeatureAsAddress(feature),
      subheading: parseContextAsString(feature?.context ?? []),
    };
  });
}
