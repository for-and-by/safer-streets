import { useEffect, useState } from "react";

import Drawer from "~/components/composites/drawer";
import useViewReset from "~/hooks/view/use-view-reset";
import useGeocoderReset from "~/hooks/geocoder/use-geocoder-reset";
import useGeocoderResults from "~/hooks/geocoder/use-geocoder-results";

export default function SearchHeader() {
  const resetView = useViewReset();

  const [{ results, isEmpty, resultsCount }] = useGeocoderResults();
  const resetGeocoder = useGeocoderReset();

  const [content, setContent] = useState({
    heading: "",
    subheading: "",
  });

  useEffect(() => {
    setContent({
      heading: `${isEmpty ? "No" : resultsCount} results found`,
      subheading: isEmpty
        ? "Select a location to jump to."
        : "Start by typing in an address.",
    });
  }, [results]);

  const handleExitSearch = () => {
    resetView();
    resetGeocoder();
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
