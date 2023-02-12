import FindSelfButton from "~/components/elements/find-self-button";
import useMapCenter from "~/hooks/map/use-map-center";
import React, { useEffect } from "react";
import useGeocoderInline from "~/hooks/geocoder/use-geocoder-inline";
import Show from "~/components/elements/show";
import { LngLatLike } from "maplibre-gl";
import parseLngLat from "~/lib/parse-lng-lat";

interface Props {
  onCenterChange?: (center: LngLatLike) => void;
  onAddressChange?: (address: string) => void;
}

export default function MapCenterInput({
  onCenterChange,
  onAddressChange,
}: Props) {
  const [center] = useMapCenter();
  const { isLoading, results } = useGeocoderInline(center);

  useEffect(() => {
    if (onCenterChange) onCenterChange(parseLngLat(center));
  }, [center]);

  useEffect(() => {
    if (onAddressChange && results?.[0]?.heading)
      onAddressChange(results[0].heading);
  }, [results]);

  return (
    <div className="flex w-full flex-row items-center space-x-4 rounded bg-gray-100 p-3">
      <div className="space-y flex flex-grow flex-col">
        <p className="text-gray-400">Approximate Address</p>
        <p className="text-gray-900">
          {!isLoading && !!results && results.length > 0
            ? results?.[0].heading
            : "Searching for address..."}
        </p>
      </div>
      <Show on={isLoading}>
        <i className="icon icon-circle-anim icon-is-spinning before:text-black" />
      </Show>
      <FindSelfButton />
    </div>
  );
}
