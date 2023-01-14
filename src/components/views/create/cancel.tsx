import React, { ComponentProps } from "react";
import useViewReset from "~/hooks/view/use-view-reset";

import WarningModal from "~/components/modals/warning";

type Props = ComponentProps<typeof WarningModal>;

export default function CancelModal({ children, ...props }: Props) {
  const resetView = useViewReset();

  const handleExitSearch = () => {
    resetView();
  };

  return (
    <WarningModal
      heading="Cancel Report Submission"
      body="Are you sure you want to cancel this submission? All data submitted up to this point will be lost."
      onConfirm={handleExitSearch}
      {...props}
    >
      {children}
    </WarningModal>
  );
}
