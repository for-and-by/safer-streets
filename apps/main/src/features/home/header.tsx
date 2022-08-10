import view from "~/store/view/actions";

import useView from "~/hooks/use-view";
import useTypedDispatch from "~/hooks/use-typed-dispatch";

import Logo from "~/features/app/logo";
import Drawer from "~/features/ui/drawer";

export default function HomeHeader() {
  const dispatch = useTypedDispatch();
  const { isActive } = useView("default");
  const handleShowSearch = () => dispatch(view.active.set("search"));

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
