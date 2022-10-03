import { createElement, ReactElement } from "react";

import useViewTransition from "~/hooks/view/use-view-transition";
import { VIEWS } from "~/stores/view";

import Drawer from "~/components/composites/drawer";

import HomeFooter from "./home/footer";
import SearchFooter from "./search/footer";
import CreateFooter from "./create/footer";

const footers: { [key: string]: () => ReactElement } = {
  [VIEWS.HOME]: HomeFooter,
  [VIEWS.SEARCH]: SearchFooter,
  [VIEWS.CREATE]: CreateFooter,
};

export default function Footer() {
  const { view, show } = useViewTransition();

  return (
    <Drawer show={show} position="bottom" className="divide-y divide-base-100 ">
      {createElement(footers[view])}
    </Drawer>
  );
}
