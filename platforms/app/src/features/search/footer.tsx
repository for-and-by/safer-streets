import React from "react";

import { setCenter } from "~/features/map/store";
import { resetSearch, runSearch } from "~/features/search/store";
import { hideToast, setToastContent } from "~/features/toast/store";
import { resetActiveView } from "~/features/views/store";

import { useTypedDispatch } from "~/features/store/hooks";
import { useView } from "~/features/views/hooks";

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
        dispatch(setToastContent("Finding results..."));
        dispatch(runSearch(address)).then(() => {
          dispatch(hideToast());
        });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [address]);

  React.useEffect(() => {
    if (address === "") {
      dispatch(resetSearch());
    }
  }, [address]);

  // Handlers
  const handleUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleFindSelf = () => {
    dispatch(setToastContent("Finding your location..."));
    if (navigator && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        dispatch(setCenter([coords.longitude, coords.latitude]));
        dispatch(hideToast());
        dispatch(resetSearch());
        dispatch(resetActiveView());
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
