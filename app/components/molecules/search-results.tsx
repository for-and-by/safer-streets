import type { SearchFeature } from "~/types/search";
import { nanoid } from "nanoid";
import React from "react";
import useMapCenter from "~/hooks/map/use-map-center";
import { useNavigate } from "@remix-run/react";

interface Props {
  results?: SearchFeature[];
}

export function SearchResults({ results = [] }: Props) {
  const [, setCenter] = useMapCenter();
  const navigate = useNavigate();

  const handleClickResult = (feature: SearchFeature) => {
    if (feature.center) setCenter(feature.center);
    navigate("/");
  };

  return (
    <>
      {results.map((feature) =>
        feature.center ? (
          <button
            key={nanoid()}
            onClick={() => handleClickResult(feature)}
            className="flex w-full flex-col bg-white p-3 transition-all hover:cursor-pointer hover:bg-gray-100"
          >
            <p className="text-base text-base-700">{feature.heading}</p>
            <p className="text-sm text-base-400">{feature.subheading}</p>
          </button>
        ) : null
      )}
    </>
  );
}
