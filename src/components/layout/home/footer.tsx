import { VIEWS } from "~/types/view";

import view from "~/store/view/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";

import Drawer from "~/components/composites/drawer";

export default function HomeFooter() {
  const dispatch = useTypedDispatch();

  const handleShowCreate = () => dispatch(view.active.set(VIEWS.CREATE));

  return (
    <Drawer.Row className="p-2">
      <button className="btn btn-primary w-full" onClick={handleShowCreate}>
        <i className="btn-icon icon icon-pin-add" />
        <p className="btn-text">Report a Hazard</p>
      </button>
    </Drawer.Row>
  );
}
