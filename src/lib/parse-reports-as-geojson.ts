import { Report } from "~/types/db";
import { FeatureCollection } from "geojson";

export default function parseReportsAsGeoJSON(
  reports: Report[]
): FeatureCollection {
  return {
    type: "FeatureCollection",
    features: reports.map((report) => ({
      type: "Feature",
      properties: report,
      geometry: {
        type: "Point",
        coordinates: [report.lng, report.lat],
      },
    })),
  };
}
