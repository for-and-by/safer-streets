import type { GeoJSONFeature, LngLatLike } from "maplibre-gl";

export interface ContextItem {
  id?: string;
  osm_id?: string;
  text?: string;
  type?: string;
}

export interface ContextObject {
  street?: ContextItem;
  subcity?: ContextItem;
  place?: ContextItem;
  county?: ContextItem;
  state?: ContextItem;
  municipality?: ContextItem;
  joint_municipality?: ContextItem;
  region?: ContextItem;
  country?: ContextItem;
  postal_code?: ContextItem;
}

export interface SearchResult extends GeoJSONFeature {
  place_type?: string;
  place_name?: string;
  center?: LngLatLike;
  context?: ContextItem[];
  text?: string;
  address?: string;
}

export interface SearchFeature {
  center?: LngLatLike;
  type?: string;
  heading?: string;
  subheading?: string;
}
