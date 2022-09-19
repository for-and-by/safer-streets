import React from "react";
import WarningModal from "~/components/modals/warning";
import { useCreateForm } from "~/contexts/create";
import useMapLock from "~/hooks/use-map-lock";
import { useViewContext } from "~/contexts/view";

interface Props {
  children?: React.ReactNode;
}

export default function CancelModal({ children }: Props) {
  const form = useCreateForm();
  const view = useViewContext();

  const map = useMapLock();

  const handleExitSearch = () => {
    view.resetView();
    map.unlock();
    form.reset();
  };

  return (
    <WarningModal
      heading="Cancel Report Submission"
      body="Are you sure you want to cancel this submission? All data submitted up to this point will be lost."
      onConfirm={handleExitSearch}
    >
      {children}
    </WarningModal>
  );
}
