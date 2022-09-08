export interface Stage {
  step: number;
  heading: string;
  description: string;
  progress: number;
  next?: string;
}

const stages: { [key: string]: Stage } = {
  location: {
    step: 1,
    heading: "Confirm Address",
    description:
      "Use the pin or drag the map to where the reports is referring to.",
    progress: 20,
    next: "details",
  },
  details: {
    step: 2,
    heading: "Add Details",
    description: "Provide some details about the reports.",
    progress: 55,
    next: "image",
  },
  image: {
    step: 3,
    heading: "Upload Photo",
    description: "Add an image to the reports.",
    progress: 80,
    next: "confirm",
  },
  confirm: {
    step: 4,
    heading: "Confirm Details",
    description: "Please confirm that the following details were correct",
    progress: 90,
    next: undefined,
  },
};

export default stages;
