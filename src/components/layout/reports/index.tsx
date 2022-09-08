import React from "react";

import useReportsDispatch from "~/hooks/use-reports-dispatch";
import Toast from "~/components/composites/toast";
import useTypedSelector from "~/hooks/use-typed-selector";
import BaseMarker from "~/components/map/markers/base";

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
        <BaseMarker key={report.id} coordinates={report} />
      ))}
    </>
  );
}
