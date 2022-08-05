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
    style:
      "https://api.maptiler.com/maps/7e89c6ff-de99-44b8-a11d-570a695ed2a2/style.json?key=0wluNT640zwZaj5fBCGp",
    default: {
      center: [153.026, -27.4705] as LngLatLike, // Brisbane LngLat
      zoom: 13,
    },
  },
};
