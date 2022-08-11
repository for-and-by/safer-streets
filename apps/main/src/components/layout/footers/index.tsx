import { VIEWS } from "~/types/view";

import React from "react";

import useViewTransition from "~/hooks/use-view-transition";

import Drawer from "~/components/elements/drawer";

import HomeFooter from "./home";
import SearchFooter from "./search";

const footers: { [key: string]: () => React.ReactElement } = {
  [VIEWS.HOME]: HomeFooter,
  [VIEWS.SEARCH]: SearchFooter,
};

export default function Header() {
  const { view, show } = useViewTransition();

  return (
    <Drawer show={show} position="bottom" className="divide-y divide-base-100">
      {React.createElement(footers[view])}
    </Drawer>
  );
}
