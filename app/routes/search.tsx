import React from "react";
import type { ActionFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";

import { config } from "~/config";

import type { SearchFeature } from "~/types/search";
import { geocode } from "~/lib/maplibre";

import SearchIndexTemplate from "~/components/templates/search";

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

export const meta: MetaFunction = () => ({
  title: "Search | " + config.seo.default.title,
  description: config.seo.default.description,
});

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  const query = data.get("query");
  const lng = data.get("lng");
  const lat = data.get("lat");

  if (query) {
    if (typeof query !== "string") {
      return json(generateSearchResponse([]));
    }
    const features = await geocode(query);
    return json(generateSearchResponse(features));
  }

  if (lng && lat) {
    if (typeof lng !== "string" || typeof lat !== "string") {
      return json(generateSearchResponse([]));
    }
    const features = await geocode([parseFloat(lng), parseFloat(lat)]);
    return json(generateSearchResponse(features));
  }

  return json(generateSearchResponse([]));
};

export default function Search() {
  return <SearchIndexTemplate />;
}
