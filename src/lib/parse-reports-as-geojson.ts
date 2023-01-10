import { Report } from "~/types/db";

export default function parseReportsAsGeoJSON(reports: Report[]) {
  return JSON.stringify({
    type: "FeatureCollection",
    features: reports.map((report) => ({
      type: "Feature",
      properties: {
        type: report.type_handle,
      },
      geometry: {
        type: "point",
        coordinates: [report.lng, report.lat],
      },
    })),
  });
}
