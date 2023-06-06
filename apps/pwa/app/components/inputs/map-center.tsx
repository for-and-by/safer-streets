import { FindSelfButton } from "~/components/atoms/find-self-button";
import useMapCenter from "~/hooks/map/use-map-center";
import React, { useEffect } from "react";
import Show from "~/components/atoms/show";
import type { LngLatLike } from "maplibre-gl";
import useSearch from "~/hooks/use-search";
import { parseLngLat } from "~/lib/maplibre";

interface Props {
  onCenterChange?: (center: LngLatLike) => void;
  onAddressChange?: (address: string) => void;
}

export default function MapCenterInput({
  onCenterChange,
  onAddressChange,
}: Props) {
  const [center] = useMapCenter();
  const { state, data } = useSearch(center);

  useEffect(() => {
    if (onCenterChange) onCenterChange(parseLngLat(center));
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center]);

  useEffect(() => {
    if (onAddressChange && data?.results?.[0]?.heading)
      onAddressChange(data?.results[0].heading);
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="flex w-full flex-row items-center space-x-4 rounded bg-gray-100 p-3">
      <div className="space-y flex flex-grow flex-col">
        <p className="text-gray-400">Approximate Address</p>
        <p className="text-gray-900">
          {!(state === "submitting") &&
          !!data?.results &&
          data.results?.length > 0
            ? data?.results?.[0].heading
            : "Searching for address..."}
        </p>
      </div>
      <Show on={state === "submitting"}>
        <i className="icon icon-circle-anim icon-is-spinning before:text-black" />
      </Show>
      <FindSelfButton />
    </div>
  );
}
