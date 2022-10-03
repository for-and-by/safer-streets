import { ChangeEventHandler, useEffect, useRef } from "react";
import { useSearch } from "~/contexts/search";

import Drawer from "~/components/composites/drawer";
import TextInput from "~/components/elements/text-input";
import FindSelfButton from "~/components/elements/find-self-button";

import useView from "~/hooks/view/use-view";
import useViewReset from "~/hooks/view/use-view-reset";
import { VIEWS } from "~/stores/view";

export default function SearchFooter() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [view, setView] = useView();
  const resetView = useViewReset();

  const search = useSearch();

  useEffect(() => {
    if (view === VIEWS.SEARCH && inputRef?.current) {
      inputRef.current.focus();
    } else {
      search.query.set("");
    }
  }, [view]);

  // Handlers
  const handleUpdateSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    search.query.set(event.target.value);
  };

  const handleFound = () => {
    resetView();
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
