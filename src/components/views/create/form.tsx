import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import useStages from "~/hooks/create/use-stages";
import useStagesReset from "~/hooks/create/use-stages-reset";
import Show from "~/components/elements/show";
import { STAGE } from "~/hooks/create/use-stages-store";
import { SeverityField } from "~/components/fields/severity-field";
import { TypeField } from "~/components/fields/type-field";
import { DetailsField } from "~/components/fields/details-field";
import { ImageField } from "~/components/fields/image-field";

import LocationField from "~/components/fields/location-field";
import SummaryField from "~/components/fields/summary-field";

export default function CreateForm() {
  const [stage] = useStages();
  const resetStages = useStagesReset();

  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <Show on={stage.current === STAGE.LOCATION}>
        <div className="bg-white p-2">
          <LocationField />
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
        <div className="bg-white p-2">
          <SummaryField />
        </div>
      </Show>
    </FormProvider>
  );
}
