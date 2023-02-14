import type { ReactNode } from "react";
import React, { useEffect } from "react";
import { Link, useLoaderData } from "@remix-run/react";

import type { ReportFull } from "~/types/db";

import useMapLock from "~/hooks/map/use-map-lock";

import Header from "~/components/regions/header";

import ReportMarker from "~/components/molecules/markers/report";
import useMapCenter from "~/hooks/map/use-map-center";

interface Props {
  children: ReactNode;
}

export default function ReportIndexTemplate({ children }: Props) {
  const loader = useLoaderData();
  const data = loader.report as ReportFull;

  const [isLocked, { setLock }] = useMapLock();
  const [, setCenter] = useMapCenter();

  useEffect(() => {
    if (!isLocked) setLock();
    setCenter(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ReportMarker coordinates={data} />
      <Header>
        <div className="flex flex-row items-center bg-white p-2">
          <Link to="/" className="btn btn-light">
            <i className="btn-icon icon icon-left" />
          </Link>
          <div className="flex flex-col px-3">
            <h3 className="font-medium">{data.type.title} Report</h3>
            <p className="text-sm text-base-400">
              Details for Report #${data.id}
            </p>
          </div>
        </div>
      </Header>
      {children}
    </>
  );
}
