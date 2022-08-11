import { VIEWS } from "~/types/view";

import React from "react";

import useTypedSelector from "~/hooks/use-typed-selector";
import useTypedDispatch from "~/hooks/use-typed-dispatch";

import Drawer from "~/components/composites/drawer";
import view from "~/store/view/actions";

export default function SearchHeader() {
  const results = useTypedSelector((state) => state.search.results);
  const dispatch = useTypedDispatch();

  const [content, setContent] = React.useState({
    heading: "",
    subheading: "",
  });

  React.useEffect(() => {
    setContent(
      results?.length
        ? {
            heading: `${results.length} results found`,
            subheading: "Select a location to jump to.",
          }
        : {
            heading: "No results found.",
            subheading: "Start by typing in an address.",
          }
    );
  }, [results]);

  const handleExitSearch = () => {
    dispatch(view.active.set(VIEWS.HOME));
  };

  return (
    <Drawer.Row className="p-2">
      <button className="btn btn-light" onClick={handleExitSearch}>
        <i className="btn-icon ri-arrow-left-line" />
      </button>
      <div className="flex flex-col px-3">
        <h3 className="text-base text-base-700">{content.heading}</h3>
        <p className="text-sm text-base-400">{content.subheading}</p>
      </div>
    </Drawer.Row>
  );
}
