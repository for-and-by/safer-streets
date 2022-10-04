import { useGeocoderStore } from "~/stores/geocoder";

export default function useGeocoderReset() {
  return useGeocoderStore((state) => state.resetSearch);
}
