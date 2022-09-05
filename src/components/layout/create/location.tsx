import React from "react";

import useTypedSelector from "~/hooks/use-typed-selector";
import useGeocoder from "~/hooks/use-geocoder";
import useMapDispatch from "~/hooks/use-map-dispatch";
import { useCreateForm } from "~/components/layout/create/provider";

import Toast from "~/components/composites/toast";
import Drawer from "~/components/composites/drawer";

export default function LocationStage() {
  const center = useTypedSelector((state) => state.map.center);
  const { results, loading } = useGeocoder(center);

  const map = useMapDispatch();
  const form = useCreateForm();

  React.useEffect(() => {
    map.controls.unlock();
  }, []);

  React.useEffect(() => {
    const [lng, lat] = center;
    form.update({ lng, lat });
  }, [center]);

  return (
    <>
      <Toast show={loading} content={"Searching for address..."} />
      <Drawer.Row className="p-2">
        <div className="flex w-full flex-row items-center space-x-2 bg-gray-100 p-2">
          {!(results?.length > 0) ? (
            <>
              <i className="icon icon-circle-anim icon-is-spinning before:text-gray-500" />
              <p>Searching for address...</p>
            </>
          ) : (
            <div className="space-y flex flex-col">
              <p className="text-gray-400">Approximate Address</p>
              <p>{results?.[0]?.heading}</p>
            </div>
          )}
        </div>
      </Drawer.Row>
      <Drawer.Row className="justify-between p-2">
        <button className="btn btn-light" onClick={() => form.stage.prev()}>
          <p className="btn-text">Cancel</p>
        </button>
        <button className="btn btn-primary" onClick={() => form.stage.next()}>
          <p className="btn-text">Provide Details</p>
        </button>
      </Drawer.Row>
    </>
  );
}
