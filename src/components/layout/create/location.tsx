import React from "react";

import useTypedSelector from "~/hooks/use-typed-selector";
import useGeocoder from "~/hooks/use-geocoder";
import useMapDispatch from "~/hooks/use-map-dispatch";
import { useCreateForm } from "~/components/layout/create/provider";

import Toast from "~/components/composites/toast";
import Drawer from "~/components/composites/drawer";
import CancelModal from "~/components/layout/create/cancel";
import FindSelfButton from "~/components/elements/find-self-button";

export default function LocationStage() {
  const map = useMapDispatch();
  const form = useCreateForm();

  const center = useTypedSelector((state) => state.map.center);
  const { results, loading } = useGeocoder(center);

  React.useEffect(() => {
    map.controls.unlock();
  }, []);

  React.useEffect(() => {
    const [lng, lat] = center;
    form?.inputs?.update({ lng, lat, address: results?.[0]?.heading });
  }, [results]);

  function handleNextStage() {
    map.controls.lock();
    form.stage.next();
  }

  console.log(form.inputs.values);

  return (
    <>
      <Toast show={loading} content={"Searching for address..."} />
      <Drawer.Row className="p-2">
        <div className="flex w-full flex-row items-center space-x-2 rounded bg-gray-100 p-3">
          {!form.inputs.values.address ? (
            <>
              <i className="icon icon-circle-anim icon-is-spinning before:text-gray-500" />
              <p>Searching for address...</p>
            </>
          ) : (
            <>
              <div className="space-y flex flex-grow flex-col">
                <p className="text-gray-400">Approximate Address</p>
                <p className="font-medium">{form.inputs.values.address}</p>
              </div>
              {/*TODO: Sometimes the Find Self button bugs out*/}
              <FindSelfButton />
            </>
          )}
        </div>
      </Drawer.Row>
      <Drawer.Row className="justify-between p-2">
        <CancelModal>
          <button className="btn btn-light">
            <p className="btn-text">Cancel</p>
          </button>
        </CancelModal>
        <button className="btn btn-primary" onClick={handleNextStage}>
          <p className="btn-text">Provide Details</p>
        </button>
      </Drawer.Row>
    </>
  );
}
