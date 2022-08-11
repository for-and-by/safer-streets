import { VIEWS } from "~/types/view";

import create from "~/store/create/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";

import Drawer from "~/components/composites/drawer";

export default function CreateFooter() {
  const dispatch = useTypedDispatch();

  const handleShowNext = () => dispatch(create.stage.next());
  const handleShowPrev = () => dispatch(create.stage.prev());

  return (
    <Drawer.Row className="justify-between p-2">
      <button className="btn btn-light" onClick={handleShowPrev}>
        <p className="btn-text">Cancel Submit</p>
      </button>
      <button className="btn btn-primary" onClick={handleShowNext}>
        <p className="btn-text">Next: Provide Details</p>
      </button>
    </Drawer.Row>
  );
}
