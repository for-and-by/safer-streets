import React, { useEffect } from "react";

import { STAGE, useCreateContext } from "~/components/templates/create/context";

import useMapLock from "~/hooks/map/use-map-lock";

import SeverityField from "~/components/fields/severity-field";
import TypeField from "~/components/fields/type-field";
import DetailsField from "~/components/fields/details-field";
import ImageField from "~/components/fields/image-field";
import LocationField from "~/components/fields/location-field";
import SummaryField from "~/components/fields/summary-field";

import Show from "~/components/atoms/show";
import CustomField from "~/components/fields/custom-field";

export default function CreateForm() {
  const { stage } = useCreateContext();
  const [, { setLock, setUnlock }] = useMapLock();

  useEffect(() => {
    if (stage.current === STAGE.LOCATION) {
      setUnlock();
    } else {
      setLock();
    }
  }, [stage]);

  return (
    <>
      <Show on={stage.current === STAGE.LOCATION}>
        <LocationField />
      </Show>
      <Show on={stage.current === STAGE.DETAILS}>
        <SeverityField />
        <TypeField />
        <CustomField />
        <DetailsField />
      </Show>
      <Show on={stage.current === STAGE.IMAGE}>
        <ImageField />
      </Show>
      <Show on={stage.current === STAGE.CONFIRM}>
        <SummaryField />
      </Show>
    </>
  );
}
