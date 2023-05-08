import {LngLatLike} from 'maplibre-gl'
import {Database} from '~/types/generated'

export interface FormCreateValues {
  location: {
    coordinates: LngLatLike
    address: string
  }
  custom: {
    [key: string]: string
  }
  image: string
  severity: string
  type: string
  details: string
}

export interface FormUpdateValues {
  id: string
  custom?: {
    [key: string]: string
  }
  image?: string
  severity?: string
  type?: string
  details?: string
}

export enum CATEGORIES {
  NATURAL = 'natural',
  INFRASTRUCTURE = 'infrastructure',
}

export enum TYPES {
  CYCLIST = 'cyclist',
  MOTORIST = 'motorist',
  WILDLIFE = 'wildlife',
  BUSHFIRE = 'bushfire',
  FLOOD = 'flood',
  PEDESTRIAN = 'pedestrian',
}

export enum SEVERITIES {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

type DatabaseTables = Database['public']['Tables']
type DatabaseRow<Key extends keyof DatabaseTables> = DatabaseTables[Key]['Row']

export type Category = DatabaseRow<'categories'>
export type Type = DatabaseRow<'types'>
export type Severity = DatabaseRow<'severities'>

export type Report = DatabaseRow<'reports'>
export type ReportContent = DatabaseRow<'reports_content'>
export type ReportVotes = DatabaseRow<'reports_votes'>

export interface ReportSummary extends Pick<Report, 'id' | 'lng' | 'lat' | 'updated_at'> {
  type: Pick<Type, 'title' | 'verify_by' | 'expire_by'>
  content: Pick<ReportContent, 'image_url' | 'is_deleted' | 'verified_at'> & {
    severity: Pick<Severity, 'title'>
  }
}

export interface ReportFull extends Report {
  content: ReportContent & {
    severity: Severity
  }
  type: Type
}

export interface ReportResult extends Report {
  content?: Partial<ReportContent>
}
