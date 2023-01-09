import React, { useEffect } from "react";

import useStages from "~/hooks/create/use-stages";
import Show from "~/components/elements/show";
import { STAGE } from "~/hooks/create/use-stages-store";
import { SeverityField } from "~/components/fields/severity-field";
import { TypeField } from "~/components/fields/type-field";
import { DetailsField } from "~/components/fields/details-field";
import { ImageField } from "~/components/fields/image-field";

import LocationField from "~/components/fields/location-field";
import SummaryField from "~/components/fields/summary-field";
import CancelModal from "~/components/views/create/cancel";
import useMapLock from "~/hooks/map/use-map-lock";

export default function CreateForm() {
  const [stage, { nextStage, prevStage }] = useStages();
  const [, { setLock, setUnlock }] = useMapLock();

  useEffect(() => {
    if (stage.current === STAGE.LOCATION) {
      setUnlock();
    } else {
      setLock();
    }
  }, [stage]);

  // // const reports = useReportsDispatch();
  //
  // const handleSubmit = () => {
  //     // reports.upload(form.inputs.values).then(() => {
  //     //   resetView();
  //     //   setUnlock();
  //     //   form.reset();
  //     //   reports.sync();
  //     // });
  // };

  return (
    <>
      <Show on={stage.current === STAGE.LOCATION}>
        <div className="bg-white p-2">
          <LocationField />
        </div>
        <div className="flex flex-row justify-between p-2">
          <CancelModal>
            <button className="btn btn-light">
              <p className="btn-text">Cancel</p>
            </button>
          </CancelModal>
          <button className="btn btn-primary" onClick={nextStage}>
            <p className="btn-text">Provide Details</p>
          </button>
        </div>
      </Show>
      <Show on={stage.current === STAGE.DETAILS}>
        <div className="space-y-2 bg-white p-2">
          <SeverityField />
          <TypeField />
          <DetailsField />
        </div>
        <div className="flex flex-row justify-between p-2">
          <button className="btn btn-light" onClick={prevStage}>
            <p className="btn-text">Select Location</p>
          </button>
          <button className="btn btn-primary" onClick={nextStage}>
            <p className="btn-text">Upload Image</p>
          </button>
        </div>
      </Show>
      <Show on={stage.current === STAGE.IMAGE}>
        <div className="bg-white p-2">
          <ImageField />
        </div>
        <div className="flex flex-row justify-between p-2">
          <button className="btn btn-light" onClick={prevStage}>
            <p className="btn-text">Provide Details</p>
          </button>
          <button className="btn btn-primary" onClick={nextStage}>
            <p className="btn-text">Confirm Report</p>
          </button>
        </div>
      </Show>
      <Show on={stage.current === STAGE.CONFIRM}>
        <div className="bg-white p-2">
          <SummaryField />
        </div>
        <div className="flex flex-row justify-between p-2">
          <button className="btn btn-light" onClick={prevStage}>
            <p className="btn-text">Upload Image</p>
          </button>
          <button className="btn btn-primary">
            <p className="btn-text">Confirm Report</p>
          </button>
        </div>
      </Show>
    </>
  );
}
