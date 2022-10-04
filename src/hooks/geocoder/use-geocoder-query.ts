import { useGeocoderStore } from "~/stores/geocoder";

export default function useGeocoderQuery() {
  const query = useGeocoderStore((state) => state.query);
  const setQuery = useGeocoderStore((state) => state.setQuery);

  return [query, setQuery] as [typeof query, typeof setQuery];
}
