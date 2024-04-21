import { useEffect } from "react";
import type { SubmitOptions } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";

import type { geocode } from "~/lib/maplibre";
import { parseLngLat } from "~/lib/maplibre";

export default function useSearch(query: Parameters<typeof geocode>[0]) {
  const fetcher = useFetcher();

  useEffect(() => {
    const options: SubmitOptions = { action: "/search", method: "post" };
    if (!query) return () => {};
    if (typeof query === "string") {
      fetcher.submit({ query }, options);
    } else {
      const [lng, lat] = parseLngLat(query);
      fetcher.submit({ lng: lng.toString(), lat: lat.toString() }, options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return fetcher;
}
