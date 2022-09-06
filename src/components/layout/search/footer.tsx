import { VIEWS } from "~/types/view";

import React from "react";

import useTypedSelector from "~/hooks/use-typed-selector";
import useViewDispatch from "~/hooks/use-view-dispatch";
import { useSearch } from "~/components/layout/search/provider";

import Drawer from "~/components/composites/drawer";
import TextInput from "~/components/elements/text-input";
import FindSelfButton from "~/components/elements/find-self-button";

export default function SearchFooter() {
  const activeView = useTypedSelector((state) => state.view.active);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const search = useSearch();
  const view = useViewDispatch();

  React.useEffect(() => {
    if (activeView === VIEWS.SEARCH && inputRef?.current) {
      inputRef.current.focus();
    } else {
      search.query.set("");
    }
  }, [activeView]);

  // Handlers
  const handleUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    search.query.set(event.target.value);
  };

  const handleFound = () => {
    view.active.reset();
  };

  return (
    <Drawer.Row className="p-2">
      <TextInput
        icon="icon-search"
        onChange={handleUpdateSearch}
        value={search.query.value}
        ref={inputRef}
        placeholder="Search for an address..."
      />
      <FindSelfButton onFound={handleFound} />
    </Drawer.Row>
  );
}
