import { createElement } from "react";

import Drawer from "~/components/composites/drawer";

import HomeHeader from "./home/header";
import SearchHeader from "./search/header";
import CreateHeader from "./create/header";

import useView from "~/hooks/view/use-view";
import { VIEWS } from "~/stores/view";

const headers: { [key: string]: () => React.ReactElement } = {
  [VIEWS.HOME]: HomeHeader,
  [VIEWS.SEARCH]: SearchHeader,
  [VIEWS.CREATE]: CreateHeader,
};

export default function Header() {
  const [view] = useView();

  return (
    <Drawer show={true} position="top" className="divide-y divide-base-100">
      {createElement(headers[view])}
    </Drawer>
  );
}
