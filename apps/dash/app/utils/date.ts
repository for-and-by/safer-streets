import type { Report, Type } from "@safer-streets/db";

export function parseDateAsString(date?: string) {
  return date ? new Date(date).toLocaleDateString() : undefined;
}

export function getIsoNow() {
  return new Date(Date.now()).toISOString();
}

interface ReportDatesFragment {
  updated_at?: Report["updated_at"];
  type: {
    verify_by?: Type["verify_by"];
    expire_by?: Type["expire_by"];
  };
}

export function parseDatesFromReport(report: ReportDatesFragment) {
  if (!report || !report.updated_at) return {};

  const { verify_by, expire_by } = report.type;
  const lastUpdated = Date.parse(report.updated_at);

  let verifyDate, expiryDate;
  if (verify_by) verifyDate = new Date(lastUpdated + verify_by * 3_600_000);
  if (expire_by) expiryDate = new Date(lastUpdated + expire_by * 3_600_000);

  return { verifyDate, expiryDate };
}
