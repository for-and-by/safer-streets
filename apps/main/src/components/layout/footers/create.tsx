import React from "react";

import create from "~/store/create/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";
import useTypedSelector from "~/hooks/use-typed-selector";

import Drawer from "~/components/composites/drawer";

const stages: {
  [key: string]: () => JSX.Element;
} = {
  location() {
    return <Drawer.Row>Location</Drawer.Row>;
  },
  details() {
    return <Drawer.Row>Details</Drawer.Row>;
  },
  image() {
    return <Drawer.Row>Image Test test test</Drawer.Row>;
  },
  confirm() {
    return <Drawer.Row>Confirm</Drawer.Row>;
  },
  submit() {
    return <Drawer.Row>Submit</Drawer.Row>;
  },
};

export default function CreateFooter() {
  const dispatch = useTypedDispatch();
  const stage = useTypedSelector((state) => state.create.stage);

  const handleShowNext = () => dispatch(create.stage.next());
  const handleShowPrev = () => dispatch(create.stage.prev());

  const Stage = stages[stage.handle];

  return (
    <>
      <Drawer.Row className="border-b border-gray-100 p-3">
        <p className="text-base text-gray-500">{stage.description}</p>
      </Drawer.Row>
      <Stage />
      <Drawer.Row className="justify-between p-2">
        <button className="btn btn-light" onClick={handleShowPrev}>
          <p className="btn-text">Cancel Submit</p>
        </button>
        <button className="btn btn-primary" onClick={handleShowNext}>
          <p className="btn-text">Next: Provide Details</p>
        </button>
      </Drawer.Row>
    </>
  );
}
