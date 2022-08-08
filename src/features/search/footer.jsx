import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

import { useView, resetFocus } from "~/store/view";
import { setCenter } from "~/store/map";

import Drawer from "~/components/composites/drawer";

const SearchFooter = () => {
  const { isFocused } = useView("search");
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.search);

  const handleSetCenter = (center) => {
    dispatch(setCenter(center));
    dispatch(resetFocus());
  };

  return (
    <Drawer
      show={isFocused}
      position="bottom"
      transition="slide"
      className="divide-y divide-base-100"
    >
      {results?.length ? (
        <Drawer.Row className="bg-base-50">
          <div className="flex max-h-48 w-full flex-col divide-y divide-base-100 overflow-y-scroll">
            {results?.map((feature) => (
              <div
                key={nanoid()}
                className="flex flex-col p-3 hover:cursor-pointer hover:bg-white"
                onClick={() => handleSetCenter(feature.center)}
              >
                <p className="text-base text-base-700">{feature.heading}</p>
                <p className="text-sm text-base-400">{feature.subheading}</p>
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
