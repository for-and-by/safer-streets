import { VIEWS } from "~/types/view";

import React from "react";

import useViewTransition from "~/hooks/use-view-transition";

import Drawer from "~/components/elements/drawer";

import HomeHeader from "./home";
import SearchHeader from "./search";

const headers: { [key: string]: () => React.ReactElement } = {
  [VIEWS.HOME]: HomeHeader,
  [VIEWS.SEARCH]: SearchHeader,
};

export default function Header() {
  const { view, show } = useViewTransition();

  return (
    <Drawer show={show} position="top" className="divide-y divide-base-100">
      {React.createElement(headers[view])}
    </Drawer>
  );
}
