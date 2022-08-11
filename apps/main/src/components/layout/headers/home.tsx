import view from "~/store/view/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";

import Logo from "~/components/elements/logo";
import Drawer from "~/components/composites/drawer";
import { VIEWS } from "~/types/view";

export default function HomeHeader() {
  const dispatch = useTypedDispatch();
  const handleShowSearch = () => dispatch(view.active.set(VIEWS.SEARCH));

  return (
    <Drawer.Row className="p-2">
      <div className="ml-3 flex-grow">
        <Logo />
      </div>
      <button className="btn btn-light" onClick={handleShowSearch}>
        <i className="ri-search-line btn-icon" />
      </button>
    </Drawer.Row>
  );
}
