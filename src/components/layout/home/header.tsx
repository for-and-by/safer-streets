import Logo from "~/components/elements/logo";
import Drawer from "~/components/composites/drawer";

import useView from "~/hooks/view/use-view";
import { VIEWS } from "~/stores/view";

export default function HomeHeader() {
  const [view, setView] = useView();
  const handleShowSearch = () => setView(VIEWS.SEARCH);

  return (
    <Drawer.Row className="p-2">
      <div className="ml-3 flex-grow">
        <Logo />
      </div>
      <button className="btn btn-light" onClick={handleShowSearch}>
        <i className="btn-icon icon icon-search" />
      </button>
    </Drawer.Row>
  );
}
