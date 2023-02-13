import React from "react";
import type { ActionFunction } from "@remix-run/router";

import type { SearchFeature } from "~/types/search";
import geocode from "~/lib/geocode";
import { SearchIndexTemplate } from "~/components/templates/search";

export interface SearchResponse {
  results: SearchFeature[];
  resultsCount: number;
  isEmpty: boolean;
}

function generateSearchResponse(features: SearchFeature[]): SearchResponse {
  return {
    results: features,
    resultsCount: features.length,
    isEmpty: features.length === 0,
  };
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const query = data.get("query");

  if (!query || typeof query !== "string") {
    return generateSearchResponse([]);
  }

  const features = await geocode(query);
  return generateSearchResponse(features);
};

export default function Search() {
  return <SearchIndexTemplate />;
}
