import useMapImages from "~/hooks/map/use-map-images";

import cyclist from "~/assets/cyclist.png";
import fire from "~/assets/fire.png";
import flood from "~/assets/flood.png";
import motorist from "~/assets/motorist.png";
import pedestrian from "~/assets/pedestrian.png";
import wildlife from "~/assets/wildlife.png";

import verifyBadge from "~/assets/badge-verify.png";
import newBadge from "~/assets/badge-new.png";

export function MapImages() {
  useMapImages([
    {
      id: "cyclist",
      url: cyclist,
    },
    {
      id: "bushfire",
      url: fire,
    },
    {
      id: "flood",
      url: flood,
    },
    {
      id: "motorist",
      url: motorist,
    },
    {
      id: "pedestrian",
      url: pedestrian,
    },
    {
      id: "wildlife",
      url: wildlife,
    },
    {
      id: "badge-new",
      url: newBadge,
    },
    {
      id: "badge-verify",
      url: verifyBadge,
    },
  ]);

  return null;
}
