import React, { ReactNode } from "react";

import deleteReport from "~/lib/delete-report";

import useAsync from "~/hooks/use-async";
import useActiveReport from "~/hooks/reports/use-active-report";

import WarningModal from "~/components/modals/warning";
import Toast from "~/components/regions/toast";
import useReportSync from "~/hooks/reports/use-report-sync";

interface Props {
  children: ReactNode;
}

export default function DeleteReportModal({ children }: Props) {
  const [activeReportId, setActiveReportId] = useActiveReport();
  const { syncReports } = useReportSync();

  const { trigger, isLoading } = useAsync(
    async () => {
      if (activeReportId) await deleteReport(activeReportId);
      else return null;
    },
    {
      onComplete: () => syncReports().finally(),
    }
  );

  const handleConfirm = () => {
    setActiveReportId(undefined);
    trigger();
  };

  return (
    <>
      <Toast content="Deleting Report..." show={isLoading} />
      <WarningModal
        heading="Delete Report"
        body="Are you sure you want to delete this report? You won't be able to recover it without "
        className="btn btn-light"
        onConfirm={handleConfirm}
      >
        {children}
      </WarningModal>
    </>
  );
}
