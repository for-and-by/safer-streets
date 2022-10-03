import { VIEWS } from "~/stores/view";

import React from "react";

import Drawer from "~/components/composites/drawer";

import HomeFooter from "./home/footer";
import SearchFooter from "./search/footer";
import CreateFooter from "./create/footer";
import useView from "~/hooks/view/use-view";

const footers: { [key: string]: () => React.ReactElement } = {
  [VIEWS.HOME]: HomeFooter,
  [VIEWS.SEARCH]: SearchFooter,
  [VIEWS.CREATE]: CreateFooter,
};

export default function Footer() {
  const [view, setView] = useView();

  return (
    <Drawer show={true} position="bottom" className="divide-y divide-base-100 ">
      {React.createElement(footers[view])}
    </Drawer>
  );
}
