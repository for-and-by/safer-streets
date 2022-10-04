import { useEffect, useRef, useState } from "react";

import useView from "~/hooks/view/use-view";
import useViewReset from "~/hooks/view/use-view-reset";
import { VIEWS } from "~/stores/view";

import useGeocoderQuery from "~/hooks/geocoder/use-geocoder-query";
import useGeocoderReset from "~/hooks/geocoder/use-geocoder-reset";

import Drawer from "~/components/composites/drawer";
import TextInput from "~/components/elements/text-input";
import FindSelfButton from "~/components/elements/find-self-button";
import useDebounce from "~/hooks/use-debounce";

export default function SearchFooter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);

  const [view, setView] = useView();
  const resetView = useViewReset();

  const [query, setQuery] = useGeocoderQuery();
  const resetGeocoder = useGeocoderReset();

  useEffect(() => {
    if (view === VIEWS.SEARCH && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [view]);

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue]);

  const handleFound = () => {
    resetView();
    resetGeocoder();
    setValue("");
  };

  return (
    <Drawer.Row className="p-2">
      <TextInput
        ref={inputRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        icon="icon-search"
        placeholder="Search for an address..."
      />
      <FindSelfButton onFound={handleFound} />
    </Drawer.Row>
  );
}
