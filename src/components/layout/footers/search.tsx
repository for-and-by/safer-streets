import { VIEWS } from "~/types/view";

import React from "react";

import toast from "~/store/toast/actions";
import search from "~/store/search/actions";
import map from "~/store/map/actions";
import view from "~/store/view/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";
import useTypedSelector from "~/hooks/use-typed-selector";
import useDebounce from "~/hooks/use-debounce";

import Drawer from "~/components/composites/drawer";
import TextInput from "~/components/form/text-input";

export default function SearchFooter() {
  const dispatch = useTypedDispatch();
  const activeView = useTypedSelector((state) => state.view.active);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [address, setAddress] = React.useState("");
  const debouncedAddress = useDebounce(address);

  React.useEffect(() => {
    if (activeView === VIEWS.SEARCH && inputRef?.current) {
      inputRef.current.focus();
    } else {
      setAddress("");
    }
  }, [activeView]);

  React.useEffect(() => {
    if (debouncedAddress === "") {
      dispatch(search.results.clear());
    } else {
      dispatch(toast.content.set("Finding results..."));
      dispatch(search.results.fetch(debouncedAddress)).then(() => {
        dispatch(toast.content.clear());
      });
    }
  }, [debouncedAddress]);

  // Handlers
  const handleUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleFindSelf = () => {
    dispatch(toast.content.set("Finding your location..."));
    if (navigator && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        dispatch(map.center.set([coords.longitude, coords.latitude]));
        dispatch(toast.content.clear());
        dispatch(search.results.clear());
        dispatch(view.active.reset());
      });
    }
  };

  return (
    <Drawer.Row className="p-2">
      <TextInput
        icon="icon-search"
        onChange={handleUpdateSearch}
        value={address}
        ref={inputRef}
        placeholder="Search for an address..."
      />
      <button className="btn btn-primary" onClick={handleFindSelf}>
        <i className="btn-icon icon icon-find-self" />
      </button>
    </Drawer.Row>
  );
}
