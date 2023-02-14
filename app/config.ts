export const config = {
  seo: {
    default: {
      title: "Safer Streets",
      description:
        "Safer Streets is a community managed hazard reporting platform that helps individuals to share safety issues with their local area.",
    },
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
    bbox: [72.24619313, -55.32281756, 168.22612585, -9.08801251], // Australia Bounding Box,
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
  supabase: {
    url: "https://ostfogwbvvrspkozoelv.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zdGZvZ3didnZyc3Brb3pvZWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4NjMyMTUsImV4cCI6MTk3NzQzOTIxNX0.DgZPshgpnXgtOLqPyXYM2nmEse1S0ibfg5TI_uFs0sI  ",
  },
};
