import { useGeocoderStore } from "~/hooks/geocoder/use-geocoder-store";

export default function useGeocoderReset() {
  return useGeocoderStore((state) => state.resetSearch);
}
