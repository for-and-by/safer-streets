import { Link } from "@remix-run/react";

import type { ReportFull } from "@safer-streets/db";

import { TypeIcon } from "~/components/elements/type-icon";

type Props = {
  report: ReportFull;
};

export function ReportTile({ report }: Props) {
  return (
    <Link
      to={`/panel/report/${report.id}`}
      key={report.id}
      className="flex justify-between bg-white p-8"
    >
      <div className="flex flex-col gap-4">
        <p className="text-lg font-medium">Report #{report.id}</p>
        <p className="max-w-2xl truncate text-gray-500">
          {report.content?.details}
        </p>
        <div className="flex gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
            <TypeIcon type={report.type.handle} className="before:text-sm" />
          </div>
          <div className="flex h-8 items-center rounded bg-gray-100 px-2">
            <p className="text-sm font-medium">
              {report.content?.severity.title}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
