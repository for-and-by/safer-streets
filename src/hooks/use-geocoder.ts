import { LngLatLike } from "maplibre-gl";

import geocode from "~/lib/geocode";
import useAsync from "~/hooks/use-async";

export default function useGeocoder(query: string | LngLatLike) {
  const request = useAsync(async () => {
    if (query === "") return [];
    try {
      return await geocode(query);
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [query]);

  return { loading: request.loading, results: request.data };
}
