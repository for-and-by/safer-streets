import React from "react";
import useStages from "~/hooks/create/use-stages";
import useStagesReset from "~/hooks/create/use-stages-reset";
import Show from "~/components/elements/show";
import { STAGE } from "~/hooks/create/use-stages-store";
import MapCenterInput from "~/components/inputs/map-center";
import { SeveritySelect } from "~/components/inputs/severity-select";
import { TypeSelect } from "~/components/inputs/type-select";

export default function CreateForm() {
  const [stage] = useStages();
  const resetStages = useStagesReset();

  return (
    <>
      <Show on={stage.current === STAGE.LOCATION}>
        <div className="bg-white p-2">
          <MapCenterInput />
        </div>
      </Show>
      <Show on={stage.current === STAGE.DETAILS}>
        <div className="space-y-2 bg-white p-2">
          <SeveritySelect />
          <TypeSelect />
        </div>
      </Show>
      <Show on={stage.current === STAGE.IMAGE}>Image</Show>
      <Show on={stage.current === STAGE.CONFIRM}>Confirm</Show>
    </>
  );
}
