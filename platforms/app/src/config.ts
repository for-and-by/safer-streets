import type { LngLatLike } from "maplibre-gl";

export default {
  seo: {
    default: {
      title: "Safer Streets",
      icon: "/favicon.png",
    },
  },
  views: {
    main: "MAIN",
    map: "MAP",
    info: "INFO",
    create: "CREATE",
    search: "SEARCH",
    filter: "FILTER",
    hazard: "HAZARD",
  },
  pwa: {
    name: "Safer Streets",
    description: "Crowd Sourced Hazard Reporting & Information",
    url: "https://saferstreets.info",
    icons: {
      sm: "/icons/icon-48x48.png",
      md: "/icons/icon-152x152.png",
      lg: "/icons/icon-512x512.png",
    },
  },
  map: {
    key: "0wluNT640zwZaj5fBCGp",
    style:
      "https://api.maptiler.com/maps/7e89c6ff-de99-44b8-a11d-570a695ed2a2/style.json",
    zoom: {
      default: 13,
      max: 18,
      min: 7,
    },
    bbox: [72.24619313, -55.32281756, 168.22612585, -9.08801251], // Australia Bounding Box,
    center: [153.026, -27.4705] as LngLatLike, // Brisbane LngLat
  },
};