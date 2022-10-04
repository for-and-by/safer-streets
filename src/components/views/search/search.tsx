import { useEffect, useRef, useState } from "react";
import { LngLatLike } from "maplibre-gl";
import { nanoid } from "nanoid";

import { VIEWS } from "~/hooks/view/use-view-store";
import useView from "~/hooks/view/use-view";
import useViewIsActive from "~/hooks/view/use-view-is-active";
import useViewReset from "~/hooks/view/use-view-reset";

import useGeocoderQuery from "~/hooks/geocoder/use-geocoder-query";
import useGeocoderResults from "~/hooks/geocoder/use-geocoder-results";
import useGeocoderReset from "~/hooks/geocoder/use-geocoder-reset";

import useDebounce from "~/hooks/use-debounce";
import useTransitionValue from "~/hooks/use-transition-value";
import useMapCenter from "~/hooks/map/use-map-center";

import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";
import Body from "~/components/regions/body";

import Bumper from "~/components/elements/bumper";
import TextInput from "~/components/elements/text-input";
import FindSelfButton from "~/components/elements/find-self-button";
import Toast from "~/components/regions/toast";

export default function Search() {
  const [center, setCenter] = useMapCenter();

  const [view, setView] = useView();
  const isSearchActive = useViewIsActive(VIEWS.SEARCH);
  const resetView = useViewReset();

  const [query, setQuery] = useGeocoderQuery();
  const [{ results, isEmpty, resultsCount, isLoading }, { fetchResults }] =
    useGeocoderResults();
  const transitionedResults = useTransitionValue(results, 500);
  const resetGeocoder = useGeocoderReset();

  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);

  const [content, setContent] = useState({
    heading: "",
    subheading: "",
  });

  useEffect(() => {
    if (isSearchActive && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [view]);

  useEffect(() => {
    fetchResults().finally();
  }, [query]);

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    setContent({
      heading: `${isEmpty ? "No" : resultsCount} results found`,
      subheading: isEmpty
        ? "Select a location to jump to."
        : "Start by typing in an address.",
    });
  }, [results]);

  const handleExitSearch = () => {
    resetView();
    resetGeocoder();
    setValue("");
  };

  const handleSetCenter = (coordinates?: LngLatLike) => {
    if (coordinates) {
      setCenter(coordinates);
      handleExitSearch();
    }
  };

  return (
    <>
      <Toast content="Finding results..." show={isLoading} />
      <Header>
        <Bumper
          show={isSearchActive}
          className="flex flex-row items-center bg-white p-2"
        >
          <button className="btn btn-light" onClick={handleExitSearch}>
            <i className="btn-icon icon icon-left" />
          </button>
          <div className="flex flex-col px-3">
            <h3 className="text-base text-base-700">{content.heading}</h3>
            <p className="text-sm text-base-400">{content.subheading}</p>
          </div>
        </Bumper>
      </Header>
      <Body>
        <Bumper
          show={isSearchActive && transitionedResults.length > 0}
          className="flex max-h-48 flex-col items-center divide-y divide-base-100 overflow-y-scroll bg-white p-2"
        >
          {transitionedResults?.map((feature) => (
            <div
              key={nanoid()}
              className="flex flex-col bg-white p-3 transition-all hover:cursor-pointer hover:bg-gray-100"
              onClick={() => handleSetCenter(feature?.center)}
            >
              <p className="text-base text-base-700">{feature?.heading}</p>
              <p className="text-sm text-base-400">{feature?.subheading}</p>
            </div>
          ))}
        </Bumper>
      </Body>
      <Footer>
        <Bumper
          show={isSearchActive}
          className="flex flex-row items-center space-x-2 bg-white p-2"
        >
          <TextInput
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            icon="icon-search"
            placeholder="Search for an address..."
          />
          <FindSelfButton onFound={handleExitSearch} />
        </Bumper>
      </Footer>
    </>
  );
}
