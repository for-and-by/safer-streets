export enum CATEGORIES {
  NATURAL = "natural",
  INFRASTRUCTURE = "infrastructure",
}

export enum TYPES {
  CYCLIST = "cyclist",
  MOTORIST = "motorist",
  WILDLIFE = "wildlife",
  BUSHFIRE = "bushfire",
  FLOOD = "flood",
  PEDESTRIAN = "pedestrian",
}

export enum SEVERITIES {
  NONE = "none",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface Category {
  handle: CATEGORIES;
  title: string;
}

export interface Type {
  handle: TYPES;
  title: string;
  category_handle: CATEGORIES;
  image_required: boolean;
  custom_fields: {
    [key: string]: string;
  };
  verify_by: number;
  expire_by: number;
}

export interface Severity {
  id: SEVERITIES;
  title: string;
}

export interface Report {
  id?: string;
  lng?: number;
  lat?: number;
  description?: string;
  data?: {
    [key: string]: string;
  };
  is_deleted?: boolean;
  is_expired?: boolean;
  image_id?: string;
  type_handle?: TYPES;
  severity_id?: SEVERITIES;
  created_at?: string;
  updated_at?: string;
  verified_at?: string;
}
