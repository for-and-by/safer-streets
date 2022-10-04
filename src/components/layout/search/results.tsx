import { useEffect } from "react";
import type { LngLatLike } from "maplibre-gl";
import { nanoid } from "nanoid";

import useTransitionValue from "~/hooks/use-transition-value";
import useMapCenter from "~/hooks/map/use-map-center";

import { VIEWS } from "~/stores/view";
import useView from "~/hooks/view/use-view";
import useViewReset from "~/hooks/view/use-view-reset";

import useGeocoderReset from "~/hooks/geocoder/use-geocoder-reset";
import useGeocoderQuery from "~/hooks/geocoder/use-geocoder-query";
import useGeocoderResults from "~/hooks/geocoder/use-geocoder-results";

import Drawer from "~/components/composites/drawer";
import Toast from "~/components/regions/toast";

export default function SearchResults() {
  const [center, setCenter] = useMapCenter();

  const [query] = useGeocoderQuery();
  const [{ results, isLoading, isEmpty }, { fetchResults }] =
    useGeocoderResults();
  const resetGeocoder = useGeocoderReset();

  const [view, setView] = useView();
  const resetView = useViewReset();

  const transitionedResults = useTransitionValue(results, 500);

  useEffect(() => {
    fetchResults().finally();
  }, [query]);

  const handleSetCenter = (coordinates?: LngLatLike) => {
    if (coordinates) {
      setCenter(coordinates);
      resetView();
      resetGeocoder();
    }
  };

  return (
    <>
      <Toast show={isLoading} content="Finding results..." />
      <Drawer
        show={!isEmpty && view === VIEWS.SEARCH}
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
