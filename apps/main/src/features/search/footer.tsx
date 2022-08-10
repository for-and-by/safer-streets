import React from "react";

import toast from "~/store/toast/actions";
import search from "~/store/search/actions";
import map from "~/store/map/actions";
import view from "~/store/view/actions";

import useView from "~/hooks/use-view";
import useTypedDispatch from "~/hooks/use-typed-dispatch";

import Drawer from "~/features/ui/drawer";
import TextInput from "~/features/form/text-input";

export default function SearchFooter() {
  const { isActive } = useView("search");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useTypedDispatch();

  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    if (isActive && inputRef?.current) {
      inputRef.current.focus();
    } else {
      setAddress("");
    }
  }, [isActive]);

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
    <Drawer
      show={isActive}
      position="bottom"
      className="divide-y divide-base-200"
    >
      <Drawer.Row className="p-2">
        <TextInput
          icon="ri-search-line"
          onChange={handleUpdateSearch}
          value={address}
          ref={inputRef}
          placeholder="Search for an address..."
        />
        <button className="btn btn-primary" onClick={handleFindSelf}>
          <i className="ri-map-pin-user-fill btn-icon" />
        </button>
      </Drawer.Row>
    </Drawer>
  );
}
