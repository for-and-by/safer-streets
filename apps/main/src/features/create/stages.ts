import { Stage } from "./types";

const stages: Stage[] = [
  {
    step: 1,
    handle: "location",
    heading: "Confirm Location",
    description:
      "Position the pin where you'd like to report this hazard, and hit 'Next' to confirm",
    progress: 15,
    next: "details",
  },
  {
    step: 2,
    handle: "details",
    heading: "Provide Details",
    description:
      "Please fill out the fields below to provide context for this hazard.",
    progress: 55,
    next: "confirm",
  },
  {
    step: 3,
    handle: "confirm",
    heading: "Confirm Details",
    description: "Please confirm that the following details were correct",
    progress: 85,
    next: "location",
  },
];

export default stages;
