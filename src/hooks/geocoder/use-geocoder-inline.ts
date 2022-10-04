import { useEffect } from "react";
import { LngLatLike } from "maplibre-gl";

import geocode from "~/lib/geocode";
import useAsync from "~/hooks/use-async";
import useDebounce from "~/hooks/use-debounce";

export default function useGeocoderInline(query: string | LngLatLike) {
  const {
    isLoading,
    data: results,
    trigger,
  } = useAsync(async () => {
    if (query === "") return [];
    try {
      return await geocode(query);
    } catch (error) {
      throw error;
    }
  });

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    trigger();
  }, [debouncedQuery]);

  return { isLoading, results };
}
