import { ReportResult } from "~/types/db";
import { FeatureCollection } from "geojson";

export default function parseReportsAsGeoJSON(
  reports: ReportResult[]
): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: reports.map((report) => ({
      type: "Feature",
      properties: { ...report, ...report.content },
      geometry: {
        type: "Point",
        coordinates: [report.lng, report.lat],
      },
    })),
  };
}
