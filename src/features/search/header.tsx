import React from "react";

import { useTypedDispatch } from "~/features/store/hooks";
import { useView } from "~/features/views/hooks";

export default function SearchHeader() {
  const { isActive, setActiveView } = useView("search");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useTypedDispatch();

  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    if (isActive && inputRef?.current) {
      inputRef.current.focus();
    } else {
      const timeout = setTimeout(() => {
        setAddress("");
        dispatch(resetSearch());
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  // Debounce search input
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (address !== "") {
        dispatch(set("Finding results..."));
        dispatch(searchAddress(address)).then(() => {
          dispatch(clearToast());
        });
      } else {
        dispatch(resetSearch());
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [address]);

  // Handlers
  const handleUpdateSearch = (event) => {
    setAddress(event.target.value);
  };

  const handleFindSelf = () => {
    dispatch(setToast("Finding your location..."));
    if (navigator && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        dispatch(setCenter([coords.longitude, coords.latitude]));
        dispatch(clearToast());
        dispatch(resetSearch());
        dispatch(resetFocus());
      });
    }
  };

  return (
    <Drawer
      show={isFocused}
      position="top"
      transition="slide"
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
