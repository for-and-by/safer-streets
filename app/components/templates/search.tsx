import React, { useEffect, useState } from "react";

import useGeocoderQuery from "~/hooks/geocoder/use-geocoder-query";
import useGeocoderResults from "~/hooks/geocoder/use-geocoder-results";
import useGeocoderReset from "~/hooks/geocoder/use-geocoder-reset";

import useDebounce from "~/hooks/use-debounce";

import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";
import Body from "~/components/regions/body";

import Bumper from "~/components/elements/bumper";
import Text from "~/components/inputs/text";
import FindSelfButton from "~/components/elements/find-self-button";
import Toast from "~/components/regions/toast";
import { useNavigate, useTransition } from "@remix-run/react";
import useMapCenter from "~/hooks/map/use-map-center";
import { nanoid } from "nanoid";
import type { SearchFeature } from "~/types/search";

export function SearchTemplate() {
  const navigate = useNavigate();
  const { state } = useTransition();
  const [, setCenter] = useMapCenter();

  const [query, setQuery] = useGeocoderQuery();
  const [{ results, isEmpty, resultsCount, isLoading }, { fetchResults }] =
    useGeocoderResults();
  const resetGeocoder = useGeocoderReset();

  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);

  const [content, setContent] = useState({
    heading: "",
    subheading: "",
  });

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
    resetGeocoder();
    navigate("/");
  };

  const handleClickResult = (feature: SearchFeature) => {
    if (feature.center) setCenter(feature.center);
    handleExitSearch();
  };

  return (
    <>
      <Toast content="Finding results..." show={isLoading} />
      <Header>
        <Bumper
          show={state === "idle"}
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
          show={results.length > 0}
          className="flex max-h-48 flex-col items-center divide-y divide-base-100 overflow-y-scroll bg-white"
        >
          {results?.map((feature) =>
            feature.center ? (
              <button
                key={nanoid()}
                onClick={handleClickResult}
                className="flex w-full flex-col bg-white p-3 transition-all hover:cursor-pointer hover:bg-gray-100"
              >
                <p className="text-base text-base-700">{feature?.heading}</p>
                <p className="text-sm text-base-400">{feature?.subheading}</p>
              </button>
            ) : null
          )}
        </Bumper>
      </Body>
      <Footer>
        <Bumper
          show={state === "idle"}
          className="flex flex-row items-center space-x-2 bg-white p-2"
        >
          <Text
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
