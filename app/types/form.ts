import type { LngLatLike } from "maplibre-gl";

export interface FormCreateValues {
  location: {
    coordinates: LngLatLike;
    address: string;
  };
  custom: {
    [key: string]: string;
  };
  image: string;
  severity: string;
  type: string;
  details: string;
}

export interface FormUpdateValues {
  id: string;
  custom?: {
    [key: string]: string;
  };
  image?: string;
  severity?: string;
  type?: string;
  details?: string;
}
