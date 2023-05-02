import { Link } from "@remix-run/react";

import type { ReportContent, Severity } from "@safer-streets/db";

type Props = {
  content: ReportContent & { severity: Severity };
};

export function ContentTile({ content }: Props) {
  return (
    <Link
      to={`/panel/content/${content.id}`}
      key={content.id}
      className="flex justify-between bg-white p-8"
    >
      <div className="flex flex-col gap-4">
        <p className="text-lg font-medium">Report Content #{content.id}</p>
        <p className="max-w-2xl truncate text-gray-500">{content.details}</p>
        <div className="flex gap-2">
          <div className="flex h-8 items-center rounded bg-gray-100 px-2">
            <Link
              to={`/panel/reports/${content.report_id}`}
              className="text-sm font-medium"
            >
              From Report #{content.report_id}
            </Link>
          </div>
          <div className="flex h-8 items-center rounded bg-gray-100 px-2">
            <p className="text-sm font-medium">{content.severity.title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
