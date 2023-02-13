import React, { useEffect, useState } from "react";

import {
  Link,
  useActionData,
  useNavigate,
  useSubmit,
  useTransition,
} from "@remix-run/react";

import type { SearchResponse } from "~/routes/search";

import Toast from "~/components/regions/toast";
import Header from "~/components/regions/header";
import Body from "~/components/regions/body";
import Footer from "~/components/regions/footer";

import Text from "~/components/molecules/inputs/text";
import { SearchResults } from "~/components/molecules/search-results";

import Show from "~/components/atoms/show";
import Bumper from "~/components/atoms/bumper";
import FindSelfButton from "~/components/atoms/find-self-button";

export function SearchTemplate() {
  const { state, type } = useTransition();
  const search = useActionData<SearchResponse>();

  const navigate = useNavigate();
  const submit = useSubmit();

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

  const hasNoResults = !search || search.isEmpty;

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
            {hasNoResults ? "No" : search.resultsCount} results found
          </h3>
          <p className="text-sm text-base-400">
            <Show on={hasNoResults}>Start by typing in an address.</Show>
            <Show on={!hasNoResults}>Select a location to jump to.</Show>
          </p>
        </div>
      </Header>
      <Body>
        <Bumper
          show={!search?.isEmpty}
          className="flex max-h-48 flex-col items-center divide-y divide-base-100 overflow-y-scroll bg-white"
        >
          <SearchResults results={search?.results} />
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
