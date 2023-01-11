import React, { useEffect } from "react";
import useReports from "~/hooks/reports/use-reports";
import useReportSync from "~/hooks/reports/use-report-sync";

import Toast from "~/components/regions/toast";
import useMapSource from "~/hooks/map/use-map-source";
import useMapLayer from "~/hooks/map/use-map-layer";
import parseReportsAsGeoJSON from "~/lib/parse-reports-as-geojson";
import useMapImages from "~/hooks/map/use-map-images";

export default function Reports() {
  const reports = useReports();
  const { syncReports, isSyncing } = useReportSync();

  useMapImages([
    {
      id: "cyclist",
      url: "/icons/cyclist.png",
    },
    {
      id: "fire",
      url: "/icons/fire.png",
    },
    {
      id: "flood",
      url: "/icons/flood.png",
    },
    {
      id: "motorist",
      url: "/icons/motorist.png",
    },
    {
      id: "pedestrian",
      url: "/icons/pedestrian.png",
    },
    {
      id: "wildlife",
      url: "/icons/wildlife.png",
    },
  ]);

  useMapSource({
    id: "reports",
    type: "geojson",
    data: parseReportsAsGeoJSON(reports),
    cluster: true,
  });

  useMapLayer({
    id: "clusters-bg",
    type: "circle",
    source: "reports",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": "red",
      "circle-radius": 20,
    },
  });

  useMapLayer({
    id: "clusters-icon",
    type: "symbol",
    source: "reports",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  useMapLayer({
    id: "reports-bg",
    type: "circle",
    source: "reports",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "black",
      "circle-radius": 20,
    },
  });

  useMapLayer({
    id: "reports-icon",
    type: "symbol",
    source: "reports",
    filter: ["!", ["has", "point_count"]],
    layout: {
      "icon-image": "{type_handle}",
      "icon-size": 0.2,
    },
  });

  useEffect(() => {
    syncReports().finally();
  }, []);

  return (
    <>
      <Toast content={"Syncing Reports..."} show={isSyncing} />
      {/*<MarkerFactory*/}
      {/*  source="reports"*/}
      {/*  filter={(marker) => !marker.properties.cluster}*/}
      {/*  render={({ geometry, properties }) =>*/}
      {/*    geometry.type === "Point" ? (*/}
      {/*      <ReportMarker*/}
      {/*        coordinates={parseLngLat(geometry.coordinates)}*/}
      {/*        report={properties as Report}*/}
      {/*      />*/}
      {/*    ) : null*/}
      {/*  }*/}
      {/*/>*/}
      {/*<MarkerFactory*/}
      {/*  source="reports"*/}
      {/*  filter={(marker) => marker.properties.cluster}*/}
      {/*  render={({ geometry, properties }) =>*/}
      {/*    geometry.type === "Point" && (*/}
      {/*      <ClusterMarker*/}
      {/*        coordinates={parseLngLat(geometry.coordinates)}*/}
      {/*        count={properties.point_count}*/}
      {/*      />*/}
      {/*    )*/}
      {/*  }*/}
      {/*/>*/}
    </>
  );
}
