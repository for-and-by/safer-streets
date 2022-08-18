import { Stage } from "~/types/create.js";

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
    progress: 30,
    next: "image",
  },
  {
    step: 3,
    handle: "image",
    heading: "Upload Image (Optional)",
    description: "Provide an image to give us visual reference",
    progress: 45,
    next: "confirm",
  },
  {
    step: 4,
    handle: "confirm",
    heading: "Confirm Details",
    description: "Please confirm that the following details were correct",
    progress: 60,
    next: "submit",
  },
  {
    step: 5,
    handle: "submit",
    heading: "Uploading Info...",
    description: "Wait for us to upload the stuff you need",
    progress: 75,
    next: "location",
  },
];

export default stages;
