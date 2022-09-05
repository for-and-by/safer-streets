import useMapDispatch from "~/hooks/use-map-dispatch";
import { useCreateForm } from "~/components/layout/create/provider";
import React from "react";
import Drawer from "~/components/composites/drawer";

export default function ImageStage() {
  const map = useMapDispatch();
  const form = useCreateForm();

  React.useEffect(() => {
    map.controls.lock();
  }, []);
  return (
    <>
      <Drawer.Row className="p-2">Upload Image</Drawer.Row>
      <Drawer.Row className="justify-between p-2">
        <button className="btn btn-light" onClick={() => form.stage.prev()}>
          <p className="btn-text">Go Back</p>
        </button>
        <button className="btn btn-primary" onClick={() => form.stage.next()}>
          <p className="btn-text">Confirm Details</p>
        </button>
      </Drawer.Row>
    </>
  );
}
