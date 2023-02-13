import React, { useEffect, useState } from "react";
import type { ActionFunction } from "@remix-run/router";
import { nanoid } from "nanoid";

import {
  Link,
  useActionData,
  useNavigate,
  useSubmit,
  useTransition,
} from "@remix-run/react";

import type { SearchFeature } from "~/types/search";
import geocode from "~/lib/geocode";

import useMapCenter from "~/hooks/map/use-map-center";

import Toast from "~/components/regions/toast";
import Header from "~/components/regions/header";
import Body from "~/components/regions/body";
import Footer from "~/components/regions/footer";

import Text from "~/components/inputs/text";

import FindSelfButton from "~/components/elements/find-self-button";
import Bumper from "~/components/elements/bumper";
import Show from "~/components/elements/show";

interface SearchResponse {
  results: SearchFeature[];
  resultsCount: number;
  isEmpty: boolean;
}

function generateSearchResponse(features: SearchFeature[]): SearchResponse {
  return {
    results: features,
    resultsCount: features.length,
    isEmpty: features.length === 0,
  };
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const query = data.get("query");

  if (!query || typeof query !== "string") {
    return generateSearchResponse([]);
  }

  const features = await geocode(query);
  return generateSearchResponse(features);
};

export default function Search() {
  const { state, type } = useTransition();
  const search = useActionData<SearchResponse>();

  const navigate = useNavigate();
  const submit = useSubmit();

  const [, setCenter] = useMapCenter();
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const data = new FormData();
      data.append("query", value);
      submit(data, { method: "post", action: "/search" });
    }, 400);

    return () => {
      clearTimeout(timeout);
    };

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleClickResult = (feature: SearchFeature) => {
    if (feature.center) setCenter(feature.center);
    navigate("/");
  };

  return (
    <>
      <Toast content="Finding results..." show={state === "submitting"} />
      <Header
        show={type !== "normalRedirect"}
        className="flex flex-row items-center bg-white p-2"
      >
        <Link to="/" className="btn btn-light">
          <i className="btn-icon icon icon-left" />
        </Link>
        <div className="flex flex-col px-3">
          <h3 className="text-base text-base-700">
            {!search || search.isEmpty ? "No" : search.resultsCount} results
            found
          </h3>
          <p className="text-sm text-base-400">
            <Show on={!search || search.isEmpty}>
              Start by typing in an address.
            </Show>
            <Show on={!!search && !search.isEmpty}>
              Select a location to jump to.
            </Show>
          </p>
        </div>
      </Header>
      <Body>
        <Bumper
          show={!search?.isEmpty}
          className="flex max-h-48 flex-col items-center divide-y divide-base-100 overflow-y-scroll bg-white"
        >
          {search?.results.map((feature) =>
            feature.center ? (
              <button
                key={nanoid()}
                onClick={() => handleClickResult(feature)}
                className="flex w-full flex-col bg-white p-3 transition-all hover:cursor-pointer hover:bg-gray-100"
              >
                <p className="text-base text-base-700">{feature.heading}</p>
                <p className="text-sm text-base-400">{feature.subheading}</p>
              </button>
            ) : null
          )}
        </Bumper>
      </Body>
      <Footer
        show={type !== "normalRedirect"}
        className="flex flex-row items-center space-x-2 bg-white p-2"
      >
        <Text
          value={value}
          onChange={(event) => setValue(event.target.value)}
          icon="icon-search"
          placeholder="Search for an address..."
        />
        <FindSelfButton onFound={() => navigate("/")} />
      </Footer>
    </>
  );
}
