import React from "react";
import useStages from "~/hooks/create/use-stages";
import useStagesReset from "~/hooks/create/use-stages-reset";
import Show from "~/components/elements/show";
import { STAGE } from "~/hooks/create/use-stages-store";
import MapCenterInput from "~/components/inputs/map-center";
import { SeverityField } from "~/components/fields/severity-field";
import { TypeField } from "~/components/fields/type-field";
import { DetailsField } from "~/components/fields/details-field";
import { ImageField } from "~/components/fields/image-field";
import { FormProvider, useForm } from "react-hook-form";

export default function CreateForm() {
  const [stage] = useStages();
  const resetStages = useStagesReset();

  const methods = useForm({});

  console.log(methods.getValues());

  return (
    <FormProvider {...methods}>
      <Show on={stage.current === STAGE.LOCATION}>
        <div className="bg-white p-2">
          <MapCenterInput />
        </div>
      </Show>
      <Show on={stage.current === STAGE.DETAILS}>
        <div className="space-y-2 bg-white p-2">
          <SeverityField />
          <TypeField />
          <DetailsField />
        </div>
      </Show>
      <Show on={stage.current === STAGE.IMAGE}>
        <div className="bg-white p-2">
          <ImageField />
        </div>
      </Show>
      <Show on={stage.current === STAGE.CONFIRM}>
        <div className="bg-white p-2"></div>
      </Show>
    </FormProvider>
  );
}
