import type { LngLatLike } from "maplibre-gl";
import { nanoid } from "nanoid";

import useTransitionValue from "~/hooks/use-transition-value";
import useMapCenter from "~/hooks/map/use-map-center";
import { useSearch } from "~/contexts/search";

import Drawer from "~/components/composites/drawer";
import Toast from "~/components/composites/toast";
import React from "react";
import useViewReset from "~/hooks/view/use-view-reset";

export default function SearchResults() {
  const [center, setCenter] = useMapCenter();
  const resetView = useViewReset();

  const search = useSearch();
  const transitionedResults = useTransitionValue(search.results, 500);

  const handleSetCenter = (coordinates?: LngLatLike) => {
    if (coordinates) {
      setCenter(coordinates);
      resetView();
      search.query.set("");
    }
  };

  return (
    <>
      <Toast show={search.loading} content="Finding results..." />
      <Drawer
        show={!!search?.results?.length}
        position="center"
        className="mb-2"
      >
        <Drawer.Row className="bg-white">
          <div className="flex max-h-48 w-full flex-col divide-y divide-base-100 overflow-y-scroll">
            {transitionedResults?.map((feature) => (
              <div
                key={nanoid()}
                className="flex flex-col bg-white p-3 transition-all hover:cursor-pointer hover:bg-gray-100"
                onClick={() => handleSetCenter(feature?.center)}
              >
                <p className="text-base text-base-700">{feature?.heading}</p>
                <p className="text-sm text-base-400">{feature?.subheading}</p>
              </div>
            ))}
          </div>
        </Drawer.Row>
      </Drawer>
    </>
  );
}
