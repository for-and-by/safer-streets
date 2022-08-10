import view from "~/store/view/actions";

import useView from "~/hooks/use-view";
import useTypedDispatch from "~/hooks/use-typed-dispatch";

import Drawer from "~/features/ui/drawer";

export default function HomeFooter() {
  const dispatch = useTypedDispatch();
  const { isActive } = useView("default");

  const handleShowCreate = () => dispatch(view.active.set("create"));

  return (
    <Drawer
      position="bottom"
      show={isActive}
      className="divide-y divide-base-100"
    >
      <Drawer.Row className="p-2">
        <button className="btn btn-primary w-full" onClick={handleShowCreate}>
          <i className="btn-icon ri-pushpin-fill" />
          <p className="btn-text">Report a Hazard</p>
        </button>
      </Drawer.Row>
    </Drawer>
  );
}
