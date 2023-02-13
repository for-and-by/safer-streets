import type { ReactNode } from "react";
import React, { useEffect } from "react";
import { Link, useLoaderData, useTransition } from "@remix-run/react";

import type { ReportFull } from "~/types/db";

import useMapLock from "~/hooks/map/use-map-lock";

import Header from "~/components/regions/header";

import ReportMarker from "~/components/organisms/map/markers/report";

interface Props {
  children: ReactNode;
}

export default function ReportIndexTemplate({ children }: Props) {
  const { type } = useTransition();

  const loader = useLoaderData();
  const data = loader.report as ReportFull;

  const [isLocked, { setLock }] = useMapLock();

  useEffect(() => {
    if (!isLocked) setLock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ReportMarker coordinates={data} />
      <Header show={type !== "normalRedirect"}>
        <div className="flex flex-row items-center bg-white p-2">
          <Link to="/" className="btn btn-light">
            <i className="btn-icon icon icon-left" />
          </Link>
          <div className="flex flex-col px-3">
            <h3 className="font-medium">Report</h3>
          </div>
        </div>
      </Header>
      {children}
    </>
  );
}
