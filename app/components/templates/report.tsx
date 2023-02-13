import useMapLock from "~/hooks/map/use-map-lock";
import type { ReactNode } from "react";
import React, { useEffect } from "react";
import ReportMarker from "~/components/organisms/map/markers/report";
import Header from "~/components/regions/header";
import Footer from "~/components/regions/footer";
import DeleteReportModal from "~/components/templates/report/delete";
import { Link, useLoaderData, useTransition } from "@remix-run/react";

interface Props {
  children: ReactNode;
}

export function ReportTemplate({ children }: Props) {
  const { type } = useTransition();
  const loader = useLoaderData();
  const data = loader.report;

  const [, { setLock }] = useMapLock();

  useEffect(() => {
    setLock();
  }, []);

  return (
    <>
      <ReportMarker coordinates={data} />
      <Header
        show={type !== "normalRedirect"}
        className="flex flex-row items-center bg-white p-2"
      >
        <Link to="/" className="btn btn-light">
          <i className="btn-icon icon icon-left" />
        </Link>
        <div className="flex flex-col px-3">
          <h3 className="font-medium">Report</h3>
        </div>
      </Header>
      <Footer
        show={type !== "normalRedirect"}
        className="max-h-[50vh] divide-y divide-gray-200 overflow-y-scroll"
      >
        {children}

        <div className="sticky bottom-0 flex justify-between bg-white p-2 shadow-md">
          <Link to={`/report/${data.id}/edit`} className="btn btn-primary">
            <p className="btn-text">Edit Report</p>
          </Link>
          <DeleteReportModal>
            <p className="btn-text">Delete</p>
          </DeleteReportModal>
        </div>
      </Footer>
    </>
  );
}
