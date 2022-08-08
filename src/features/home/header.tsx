import { useView } from "~/store/view";

import Logo from "~/components/elements/logo";
import Drawer from "~/components/composites/drawer";

export default function HomeHeader() {
  const { isActive, setActiveView } = useView("default");
  const handleShowSearch = () => setActiveView("search");

  return (
    <Drawer position="top" show={isActive}>
      <Drawer.Row className="p-2">
        <div className="ml-3 flex-grow">
          <Logo />
        </div>
        <button className="btn btn-light" onClick={handleShowSearch}>
          <i className="ri-search-line btn-icon" />
        </button>
      </Drawer.Row>
    </Drawer>
  );
}
