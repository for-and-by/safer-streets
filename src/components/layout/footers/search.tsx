import React from "react";

import toast from "~/store/toast/actions";
import search from "~/store/search/actions";
import map from "~/store/map/actions";
import view from "~/store/view/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";

import Drawer from "~/components/composites/drawer";
import TextInput from "~/components/form/text-input";
import useTypedSelector from "~/hooks/use-typed-selector";
import { VIEWS } from "~/types/view";

export default function SearchFooter() {
  const dispatch = useTypedDispatch();
  const activeView = useTypedSelector((state) => state.view.active);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    if (activeView === VIEWS.SEARCH && inputRef?.current) {
      inputRef.current.focus();
    } else {
      setAddress("");
    }
  }, [activeView]);

  // Debounce search input
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (address !== "") {
        dispatch(toast.content.set("Finding results..."));
        dispatch(search.results.fetch(address)).then(() => {
          dispatch(toast.hide());
        });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [address]);

  React.useEffect(() => {
    if (address === "") {
      dispatch(search.results.hide());
    }
  }, [address]);

  // Handlers
  const handleUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleFindSelf = () => {
    dispatch(toast.content.set("Finding your location..."));
    if (navigator && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        dispatch(map.center.set([coords.longitude, coords.latitude]));
        dispatch(toast.hide());
        dispatch(search.results.hide());
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
