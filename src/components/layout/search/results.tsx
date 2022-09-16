import type { LngLatLike } from "maplibre-gl";
import { nanoid } from "nanoid";

import useTypedDispatch from "~/hooks/use-typed-dispatch";
import useTransitionValue from "~/hooks/use-transition-value";
import useMapCenter from "~/hooks/map/use-map-center";
import { useSearch } from "~/components/layout/search/provider";

import view from "~/store/view/actions";

import Drawer from "~/components/composites/drawer";
import Toast from "~/components/composites/toast";
import React from "react";

export default function SearchResults() {
  const dispatch = useTypedDispatch();
  const center = useMapCenter();

  const search = useSearch();
  const transitionedResults = useTransitionValue(search.results, 500);

  const handleSetCenter = (coordinates?: LngLatLike) => {
    if (coordinates) {
      center.set(coordinates);
      dispatch(view.active.reset());
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
