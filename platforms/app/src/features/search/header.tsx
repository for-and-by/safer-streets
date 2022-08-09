import React from "react";

import { useTypedSelector } from "~/features/store/hooks";
import { useView } from "~/features/views/hooks";

import Drawer from "~/features/ui/drawer";

export default function SearchHeader() {
  const results = useTypedSelector((state) => state.search.results);
  const { isActive, setActiveView } = useView("search");

  const [content, setContent] = React.useState({
    heading: "",
    subheading: "",
  });

  React.useEffect(() => {
    setContent(
      results?.length
        ? {
            heading: "{results.length} results found",
            subheading: "Select a location to jump to.",
          }
        : {
            heading: "No results found.",
            subheading: "Start by typing in an address.",
          }
    );
  }, [results]);

  const handleExitSearch = () => {
    setActiveView("default");
  };

  return (
    <Drawer show={isActive} position="top" className="divide-y divide-base-100">
      <Drawer.Row className="p-2">
        <button className="btn btn-light" onClick={handleExitSearch}>
          <i className="btn-icon ri-arrow-left-line" />
        </button>
        <div className="flex flex-col px-3">
          <h3 className="text-base text-base-700">{content.heading}</h3>
          <p className="text-sm text-base-400">{content.subheading}</p>
        </div>
      </Drawer.Row>
    </Drawer>
  );
}
