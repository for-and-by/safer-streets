import React from "react";
import { useSearch } from "~/contexts/search";

import Drawer from "~/components/composites/drawer";
import useResetView from "~/hooks/view/use-reset-view";

export default function SearchHeader() {
  const search = useSearch();
  const resetView = useResetView();

  const [content, setContent] = React.useState({
    heading: "",
    subheading: "",
  });

  React.useEffect(() => {
    setContent(
      search?.results?.length
        ? {
            heading: `${search?.results?.length ?? 0} results found`,
            subheading: "Select a location to jump to.",
          }
        : {
            heading: "No results found.",
            subheading: "Start by typing in an address.",
          }
    );
  }, [search.results]);

  const handleExitSearch = () => {
    resetView();
    search.query.set("");
  };

  return (
    <Drawer.Row className="p-2">
      <button className="btn btn-light" onClick={handleExitSearch}>
        <i className="btn-icon icon icon-left" />
      </button>
      <div className="flex flex-col px-3">
        <h3 className="text-base text-base-700">{content.heading}</h3>
        <p className="text-sm text-base-400">{content.subheading}</p>
      </div>
    </Drawer.Row>
  );
}
