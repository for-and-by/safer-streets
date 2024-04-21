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
    bbox: [111.30146, -43.668617, 158.147163, -11.986599], // Australia Bounding Box,
    style:
      "https://api.maptiler.com/maps/7e89c6ff-de99-44b8-a11d-570a695ed2a2/style.json",
    zoom: {
      default: 13,
      max: 18,
      min: 7,
      increment: 0.5,
    },
    center: {
      default: [153.026, -27.4705] as [number, number], // Brisbane LngLat
    },
  },
};
