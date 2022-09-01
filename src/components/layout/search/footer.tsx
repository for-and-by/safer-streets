import { VIEWS } from "~/types/view";

import React from "react";

import map from "~/store/map/actions";
import view from "~/store/view/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";
import useTypedSelector from "~/hooks/use-typed-selector";
import useToast from "~/hooks/use-toast";
import { useSearch } from "~/components/layout/search/provider";

import Drawer from "~/components/composites/drawer";
import TextInput from "~/components/form/text-input";

export default function SearchFooter() {
  const dispatch = useTypedDispatch();
  const activeView = useTypedSelector((state) => state.view.active);

  const toast = useToast();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const search = useSearch();

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

  const handleFindSelf = () => {
    toast.set("Finding your location...");
    if (navigator && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        toast.clear();
        dispatch(map.center.set([coords.longitude, coords.latitude]));
        dispatch(view.active.reset());
      });
    }
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
      <button className="btn btn-primary" onClick={handleFindSelf}>
        <i className="btn-icon icon icon-find-self" />
      </button>
    </Drawer.Row>
  );
}
