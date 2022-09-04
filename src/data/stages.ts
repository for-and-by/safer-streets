import { Stage } from "~/types/create";

const stages: { [key: string]: Stage } = {
  location: {
    step: 1,
    heading: "Confirm Location",
    description:
      "Position the pin where you'd like to report this hazard, and hit 'Next' to confirm",
    progress: 15,
    next: "details",
  },
  details: {
    step: 2,
    heading: "Provide Details",
    description:
      "Please fill out the fields below to provide context for this hazard.",
    progress: 30,
    next: "image",
  },
  image: {
    step: 3,
    heading: "Upload Image (Optional)",
    description: "Provide an image to give us visual reference",
    progress: 45,
    next: "confirm",
  },
  confirm: {
    step: 4,
    heading: "Confirm Details",
    description: "Please confirm that the following details were correct",
    progress: 60,
    next: "submit",
  },
  submit: {
    step: 5,
    heading: "Uploading Info...",
    description: "Wait for us to upload the stuff you need",
    progress: 75,
    next: "location",
  },
};

export default stages;
