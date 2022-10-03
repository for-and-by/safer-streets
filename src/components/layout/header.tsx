import { createElement, ReactElement } from "react";

import useViewTransition from "~/hooks/view/use-view-transition";
import { VIEWS } from "~/stores/view";

import Drawer from "~/components/composites/drawer";

import HomeHeader from "./home/header";
import SearchHeader from "./search/header";
import CreateHeader from "./create/header";

const headers: { [key: string]: () => ReactElement } = {
  [VIEWS.HOME]: HomeHeader,
  [VIEWS.SEARCH]: SearchHeader,
  [VIEWS.CREATE]: CreateHeader,
};

export default function Header() {
  const { view, show } = useViewTransition();

  return (
    <Drawer show={show} position="top" className="divide-y divide-base-100">
      {createElement(headers[view])}
    </Drawer>
  );
}
