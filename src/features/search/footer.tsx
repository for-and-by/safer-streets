import type { LngLatLike } from "maplibre-gl";

import { nanoid } from "nanoid";

import { useTypedDispatch, useTypedSelector } from "~/features/store/hooks";
import { useView } from "~/features/views/hooks";

import Drawer from "~/features/ui/drawer";
import { setCenter } from "~/features/map/store";
import { resetActiveView } from "~/features/views/store";

const SearchFooter = () => {
  const dispatch = useTypedDispatch();
  const results = useTypedSelector((state) => state.search.results);

  const { isActive } = useView("search");

  const handleSetCenter = (center?: LngLatLike) => {
    if (center) {
      dispatch(setCenter(center));
      dispatch(resetActiveView());
    }
  };

  console.log(results);

  return (
    <Drawer
      show={isActive}
      position="bottom"
      className="divide-y divide-base-100"
    >
      {results?.length ? (
        <Drawer.Row className="bg-base-50">
          <div className="flex max-h-48 w-full flex-col divide-y divide-base-100 overflow-y-scroll">
            {results?.map((feature) => (
              <div
                key={nanoid()}
                className="flex flex-col p-3 hover:cursor-pointer hover:bg-white"
                onClick={() => handleSetCenter(feature?.center)}
              >
                <p className="text-base text-base-700">{feature?.heading}</p>
                <p className="text-sm text-base-400">{feature?.subheading}</p>
              </div>
            ))}
          </div>
        </Drawer.Row>
      ) : null}
      <Drawer.Row className="shadow-lg">
        {results?.length ? (
          <div className="flex flex-col p-3">
            <h3 className="text-base text-base-700">
              {results.length} results found
            </h3>
            <p className="text-sm text-base-400">
              Select a location to jump to.
            </p>
          </div>
        ) : (
          <div className="flex flex-col p-3">
            <h3 className="text-base text-base-700">No results found.</h3>
            <p className="text-sm text-base-400">
              Start by typing in an address.
            </p>
          </div>
        )}
      </Drawer.Row>
    </Drawer>
  );
};

SearchFooter.propTypes = {};

export default SearchFooter;
