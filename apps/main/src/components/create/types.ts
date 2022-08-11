import { LngLatLike } from "maplibre-gl";

export interface CreateState {
  submitting: boolean;
  stage: Stage;
  submission: {
    coordinates: LngLatLike | [];
    details: Details;
  };
}

export interface Details {
  type?: string,
  affects?: string,
  severity?: string,
  notes?: string,
}

export interface Stage {
  step: number;
  handle: string;
  heading: string;
  description: string;
  progress: number;
  next: string;
}
