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
  country?: ContextItem;
  postcode?: ContextItem;
}

export interface SearchResult extends GeoJSONFeature {
  place_type?: string;
  place_name?: string;
  center?: LngLatLike;
  context?: ContextItem[];
}

export interface SearchFeature {
  center?: LngLatLike;
  type?: string;
  heading?: string;
  subheading?: string;
}
