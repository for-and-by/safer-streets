import { LngLatLike } from "maplibre-gl";

export interface Stage {
  step: number;
  handle: string;
  heading: string;
  description: string;
  progress: number;
  next: string;
}

export enum TYPE {
  FLOOD = "flood",
  FIRE = "fire",
  SUGGESTION = "suggestion",
  DAMAGE = "damage",
}

export enum SEVERITY {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
  NONE = "none",
}

export enum AFFECTS {
  ALL = "all",
  PEDESTRIAN = "pedestrian",
  MOTORIST = "motorist",
  WILDLIFE = "wildlife",
}

export interface SubmitData {
  coordinates?: LngLatLike;
  details: {
    type?: TYPE;
    affects?: AFFECTS;
    severity?: SEVERITY;
    notes?: string;
  };
}
