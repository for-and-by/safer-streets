import {CATEGORIES, SEVERITIES, TYPES} from '~/types/form'

export type Json = string | number | boolean | null | {[key: string]: Json} | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          handle: string
          title: string
        }
        Insert: {
          handle?: string
          title: string
        }
        Update: {
          handle?: string
          title?: string
        }
      }
      reports: {
        Row: {
          content_id: number | null
          created_at: string
          id: number
          lat: number | null
          lng: number
          type_handle: string
          updated_at: string
          verified_at: string
        }
        Insert: {
          content_id?: number | null
          created_at?: string
          id?: number
          lat?: number | null
          lng: number
          type_handle: string
          updated_at?: string
          verified_at?: string
        }
        Update: {
          content_id?: number | null
          created_at?: string
          id?: number
          lat?: number | null
          lng?: number
          type_handle?: string
          updated_at?: string
          verified_at?: string
        }
      }
      reports_content: {
        Row: {
          created_at: string
          data: Json
          details: string
          id: number
          image_url: string | null
          is_deleted: boolean
          report_id: number | null
          severity_handle: string
        }
        Insert: {
          created_at?: string
          data: Json
          details: string
          id?: number
          image_url?: string | null
          is_deleted?: boolean
          report_id?: number | null
          severity_handle: string
        }
        Update: {
          created_at?: string
          data?: Json
          details?: string
          id?: number
          image_url?: string | null
          is_deleted?: boolean
          report_id?: number | null
          severity_handle?: string
        }
      }
      reports_votes: {
        Row: {
          downvotes: number
          id: number
          report_id: number
          upvotes: number
        }
        Insert: {
          downvotes?: number
          id?: number
          report_id: number
          upvotes?: number
        }
        Update: {
          downvotes?: number
          id?: number
          report_id?: number
          upvotes?: number
        }
      }
      severities: {
        Row: {
          handle: SEVERITIES
          title: string
        }
        Insert: {
          handle?: string
          title: string
        }
        Update: {
          handle?: string
          title?: string
        }
      }
      types: {
        Row: {
          category_handle: CATEGORIES
          custom_fields: Json
          expire_by: number
          handle: TYPES
          image_required: boolean
          title: string
          verify_by: number
        }
        Insert: {
          category_handle: CATEGORIES
          custom_fields?: Json
          expire_by?: number
          handle: string
          image_required?: boolean
          title: string
          verify_by?: number
        }
        Update: {
          category_handle?: CATEGORIES
          custom_fields?: Json
          expire_by?: number
          handle?: string
          image_required?: boolean
          title?: string
          verify_by?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
