import { VIEWS } from "~/types/view";

import React from "react";

import useTypedSelector from "~/hooks/use-typed-selector";
import { useSearch } from "~/contexts/search";

import Drawer from "~/components/composites/drawer";
import TextInput from "~/components/elements/text-input";
import FindSelfButton from "~/components/elements/find-self-button";
import { useViewContext } from "~/contexts/view";

export default function SearchFooter() {
  const activeView = useTypedSelector((state) => state.view.active);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const search = useSearch();
  const view = useViewContext();

  React.useEffect(() => {
    if (view.activeView === VIEWS.SEARCH && inputRef?.current) {
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
    view.resetView();
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
