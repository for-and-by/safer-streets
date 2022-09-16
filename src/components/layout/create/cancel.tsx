import React from "react";
import WarningModal from "~/components/modals/warning";
import { useCreateForm } from "~/components/layout/create/provider";
import useViewDispatch from "~/hooks/use-view-dispatch";
import { useMapSelector } from "~/components/map/provider";

interface Props {
  children?: React.ReactNode;
}

export default function CancelModal({ children }: Props) {
  const form = useCreateForm();
  const view = useViewDispatch();

  const unlockMap = useMapSelector((state) => state.unlockMap);

  const handleExitSearch = () => {
    view.active.reset();
    unlockMap();
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
