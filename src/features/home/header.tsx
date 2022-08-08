import { useView } from "~/features/views/hooks";

import Logo from "~/features/app/logo";
import Drawer from "~/features/ui/drawer";

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
