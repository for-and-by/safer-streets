import type { ReactNode } from "react";
import React from "react";

import deleteReport from "~/lib/delete-report";

import useAsync from "~/hooks/use-async";
import useActiveReport from "~/hooks/reports/use-active-report";

import {
  WarningPanel,
  WarningRoot,
  WarningTrigger,
} from "~/components/composites/warning";
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
    <WarningRoot>
      <Toast content="Deleting Report..." show={isLoading} />
      <WarningTrigger className="btn btn-light">{children}</WarningTrigger>
      <WarningPanel
        heading="Delete Report"
        body="Are you sure you want to delete this report? You won't be able to recover it without "
        onConfirm={handleConfirm}
      />
    </WarningRoot>
  );
}
