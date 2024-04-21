import type { ChangeEventHandler, KeyboardEventHandler } from "react";
import { useRef } from "react";
import { nanoid } from "nanoid";

import type { ActionFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";

import { formatMetadata } from "~/utils/seo";
import { geocode } from "~/lib/maplibre";

import { useMapCenter } from "~/hooks/map/use-map-center";

import Toast from "~/components/regions/toast";
import Header from "~/components/regions/header";
import Body from "~/components/regions/body";
import Footer from "~/components/regions/footer";

import { FindSelfButton } from "~/components/atoms/find-self-button";
import { Bumper } from "~/components/atoms/bumper";
import Text from "~/components/inputs/text";

import type { SearchFeature } from "~/types/search";

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

  const [, setCenter] = useMapCenter();

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

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = () => {
    clearTimeout(timeoutRef.current);
  };

  const handleClickResult = (feature: SearchFeature) => {
    if (feature.center) setCenter(feature.center);
    navigate("/");
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
        <Bumper isShow={!search?.isEmpty}>
          <div className="flex max-h-48 flex-col items-center divide-y divide-base-100 overflow-y-scroll bg-white">
            {search?.results.map((feature: SearchFeature) =>
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
          </div>
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
