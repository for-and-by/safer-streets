import { useMapImages } from "~/hooks/map/use-map-images";

export function MapImages() {
  useMapImages([
    {
      id: "cyclist",
      url: "/pins/cyclist.png",
    },
    {
      id: "bushfire",
      url: "/pins/fire.png",
    },
    {
      id: "flood",
      url: "/pins/flood.png",
    },
    {
      id: "motorist",
      url: "/pins/motorist.png",
    },
    {
      id: "pedestrian",
      url: "/pins/pedestrian.png",
    },
    {
      id: "wildlife",
      url: "/pins/wildlife.png",
    },
    {
      id: "badge-new",
      url: "/pins/badge-new.png",
    },
    {
      id: "badge-verify",
      url: "/pins/badge-verify.png",
    },
  ]);

  return null;
}
