import { VIEWS } from "~/types/view";

import React from "react";

import map from "~/store/map/actions";
import view from "~/store/view/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";
import useTypedSelector from "~/hooks/use-typed-selector";
import useFindSelf from "~/hooks/use-find-self";
import { useSearch } from "~/components/layout/search/provider";

import Drawer from "~/components/composites/drawer";
import TextInput from "~/components/elements/text-input";
import Toast from "~/components/composites/toast";

export default function SearchFooter() {
  const dispatch = useTypedDispatch();
  const activeView = useTypedSelector((state) => state.view.active);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const search = useSearch();
  const findSelf = useFindSelf();

  React.useEffect(() => {
    if (activeView === VIEWS.SEARCH && inputRef?.current) {
      inputRef.current.focus();
    } else {
      search.query.set("");
    }
  }, [activeView]);

  React.useEffect(() => {
    if (findSelf.coords) {
      dispatch(map.center.set(findSelf.coords));
      dispatch(view.active.set(VIEWS.HOME));
    }
  }, [findSelf.loading]);

  // Handlers
  const handleUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    search.query.set(event.target.value);
  };

  const handleFindSelf = () => {
    findSelf.run();
  };

  return (
    <>
      <Toast show={findSelf.loading} content="Finding your location..." />
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
    </>
  );
}
