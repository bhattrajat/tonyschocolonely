export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          bars: number
          created_at: string
          id: number
          image_url: string
          name: string
          price: number
          weight: number
        }
        Insert: {
          bars: number
          created_at?: string
          id?: number
          image_url: string
          name: string
          price: number
          weight: number
        }
        Update: {
          bars?: number
          created_at?: string
          id?: number
          image_url?: string
          name?: string
          price?: number
          weight?: number
        }
        Relationships: []
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
