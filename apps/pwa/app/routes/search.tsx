import type { ChangeEventHandler, KeyboardEventHandler } from "react";
import React, { useRef } from "react";

import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";

import { formatMetadata } from "~/utils/seo";
import { geocode } from "~/lib/maplibre";

import Toast from "~/components/regions/toast";
import Header from "~/components/regions/header";
import Body from "~/components/regions/body";
import Footer from "~/components/regions/footer";

import SearchResults from "~/components/molecules/search-results";

import FindSelfButton from "~/components/atoms/find-self-button";
import Bumper from "~/components/atoms/bumper";
import Text from "~/components/inputs/text";

export const meta: MetaFunction = () => {
  return formatMetadata({
    title: "Search",
  });
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();

  const query = data.get("query");
  const lng = data.get("lng");
  const lat = data.get("lat");

  const hasQuery = query && typeof query === "string";
  const hasLngLat =
    lng && lat && typeof lng === "string" && typeof lat === "string";

  const features = hasQuery
    ? await geocode(query)
    : hasLngLat
    ? await geocode([parseFloat(lng), parseFloat(lat)])
    : [];

  return json({
    results: features,
    resultsCount: features.length,
    isEmpty: features.length === 0,
  });
};

export default function Search() {
  const submit = useSubmit();
  const search = useActionData();
  const { state } = useNavigation();
  const navigate = useNavigate();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      submit(
        { query: event.target.value },
        { method: "post", action: "/search" }
      );
    }, 400);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    clearTimeout(timeoutRef.current);
  };

  const hasNoResults = !search || search.isEmpty;

  return (
    <>
      <Toast content="Finding results..." show={state === "submitting"} />
      <Header>
        <div className="flex flex-row items-center bg-white p-2">
          <Link to="/" className="btn btn-light">
            <i className="btn-icon icon icon-arrow-left" />
          </Link>
          <div className="flex flex-col px-3">
            <h3 className="text-base text-base-700">
              {hasNoResults ? "No" : search.resultsCount} results found
            </h3>
            <p className="text-sm text-base-400">
              {hasNoResults
                ? "Type in an address below."
                : "Select a location to jump to."}
            </p>
          </div>
        </div>
      </Header>
      <Body>
        <Bumper show={!search?.isEmpty}>
          <SearchResults results={search?.results} />
        </Bumper>
      </Body>
      <Footer>
        <div className="flex flex-row items-center space-x-2 bg-white p-2">
          <Text
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            icon="icon-search"
            placeholder="Search for an address..."
          />
          <FindSelfButton onFound={() => navigate("/")} />
        </div>
      </Footer>
    </>
  );
}
