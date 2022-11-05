import useStages from "~/hooks/create/use-stages";
import useStagesReset from "~/hooks/create/use-stages-reset";
import Show from "~/components/elements/show";
import { STAGE } from "~/hooks/create/use-stages-store";
import MapCenterInput from "~/components/inputs/map-center";

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
      <Show on={stage.current === STAGE.DETAILS}>'Details'</Show>
      <Show on={stage.current === STAGE.IMAGE}>Image</Show>
      <Show on={stage.current === STAGE.CONFIRM}>Confirm</Show>
    </>
  );
}
