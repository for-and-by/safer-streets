import React from "react";
import { LngLatLike } from "maplibre-gl";

import geocode from "~/lib/geocode";

import useAsync from "~/hooks/use-async";
import useToast from "~/hooks/use-toast";

export default function useGeocoder(query: string | LngLatLike) {
  const toast = useToast();
  const request = useAsync(async () => {
    if (query === "") return [];
    try {
      return await geocode(query);
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [query]);

  React.useEffect(() => {
    if (request.loading) {
      toast.set("Finding search results...");
    } else {
      toast.clear();
    }
  }, [request.loading]);

  return { loading: request.loading, results: request.data };
}
