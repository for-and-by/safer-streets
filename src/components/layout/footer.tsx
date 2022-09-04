import { VIEWS } from "~/types/view";

import React from "react";

import useViewTransition from "~/hooks/use-view-transition";

import Drawer from "~/components/composites/drawer";

import HomeFooter from "./home/footer";
import SearchFooter from "./search/footer";
import CreateFooter from "./create/footer";

const footers: { [key: string]: () => React.ReactElement } = {
  [VIEWS.HOME]: HomeFooter,
  [VIEWS.SEARCH]: SearchFooter,
  [VIEWS.CREATE]: CreateFooter,
};

export default function Footer() {
  const { view, show } = useViewTransition();

  return (
    <Drawer show={show} position="bottom" className="divide-y divide-base-100 ">
      {React.createElement(footers[view])}
    </Drawer>
  );
}
