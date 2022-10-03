import WarningModal from "~/components/modals/warning";
import { useCreateForm } from "~/contexts/create";

import useMapLock from "~/hooks/map/use-map-lock";
import useResetView from "~/hooks/view/use-reset-view";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function CancelModal({ children }: Props) {
  const form = useCreateForm();

  const resetView = useResetView();
  const [, { setUnlock }] = useMapLock();

  const handleExitSearch = () => {
    resetView();
    setUnlock();
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
