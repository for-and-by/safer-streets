import { LngLatLike } from "maplibre-gl";

export interface FormValues {
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
