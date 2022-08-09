import { useTypedDispatch, useTypedSelector } from "~/features/store/hooks";
import { useView } from "~/features/views/hooks";

import Drawer from "~/features/ui/drawer";

export default function SearchHeader() {
  const dispatch = useTypedDispatch();
  const results = useTypedSelector((state) => state.search.results);

  const { isActive, setActiveView } = useView("search");

  const handleExitSearch = () => {
    setActiveView("default");
  };

  return (
    <Drawer show={isActive} position="top" className="divide-y divide-base-100">
      <Drawer.Row className="p-2">
        <button className="btn btn-light" onClick={handleExitSearch}>
          <i className="btn-icon ri-arrow-left-line" />
        </button>
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
}
