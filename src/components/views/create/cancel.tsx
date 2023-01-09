import React, { ReactNode } from "react";
import useViewReset from "~/hooks/view/use-view-reset";

import WarningModal from "~/components/modals/warning";

interface Props {
  children?: ReactNode;
}

export default function CancelModal({ children }: Props) {
  const resetView = useViewReset();

  const handleExitSearch = () => {
    resetView();
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
