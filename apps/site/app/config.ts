export const config = {
  seo: {
    default: {
      title: "Safer Streets",
      description:
        "Safer Streets is a community managed hazard reporting platform that helps individuals to share safety issues with their local area.",
    },
  },
  css: {
    maplibre: "https://unpkg.com/maplibre-gl@2.1.9/dist/maplibre-gl.css",
    fonts:
      "https://fonts.googleapis.com/css2?family=Inter:wght@300..800&display=swap",
  },
  map: {
    style:
      "https://api.maptiler.com/maps/914eb90d-b054-4e56-900c-a1aa5d2b7b42/style.json",
    key: "0wluNT640zwZaj5fBCGp",
    center: {
      default: [153, -27.4705] as [number, number], // Brisbane LngLat
    },
    zoom: {
      default: 12,
    },
  },
  pwa: {
    name: "Safer Streets",
    description: "Crowd Sourced Hazard Reporting & Information",
    url: "https://saferstreets.info",
  },
};
