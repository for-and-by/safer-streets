import React from "react";

import useReportsDispatch from "~/hooks/use-reports-dispatch";
import useTypedSelector from "~/hooks/use-typed-selector";

import Toast from "~/components/composites/toast";
import ReportMarker from "~/components/map/markers/report";

export default function Reports() {
  const reports = useReportsDispatch();

  const syncing = useTypedSelector((state) => state.reports.pending.sync);
  const list = useTypedSelector((state) => state.reports.list);

  React.useEffect(() => {
    reports.sync();
  }, []);

  return (
    <>
      <Toast content={"Syncing Reports..."} show={syncing} />
      {list.map((report) => (
        <ReportMarker key={report.id} report={report} />
      ))}
    </>
  );
}
