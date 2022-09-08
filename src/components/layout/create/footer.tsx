import React from "react";

import { useCreateForm } from "~/components/layout/create/provider";

import Drawer from "~/components/composites/drawer";

import LocationStage from "~/components/layout/create/location";
import DetailsStage from "~/components/layout/create/details";
import ImageStage from "~/components/layout/create/image";
import ConfirmStage from "~/components/layout/create/confirm";

export default function CreateFooter() {
  const form = useCreateForm();

  const stages: {
    [key: string]: () => JSX.Element;
  } = {
    location: LocationStage,
    details: DetailsStage,
    image: ImageStage,
    confirm: ConfirmStage,
  };

  const Stage = stages[form.stage.handle];

  return (
    <>
      <Drawer.Row className="p-3">
        <p className="text-base">{form.stage.value.description}</p>
      </Drawer.Row>
      <Stage />
    </>
  );
}
