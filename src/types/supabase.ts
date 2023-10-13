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
          categories: Database["public"]["Enums"]["category"][] | null
          created_at: string
          id: number
          image_url: string
          name: string
          price: number
          weight: number
        }
        Insert: {
          bars: number
          categories?: Database["public"]["Enums"]["category"][] | null
          created_at?: string
          id?: number
          image_url: string
          name: string
          price: number
          weight: number
        }
        Update: {
          bars?: number
          categories?: Database["public"]["Enums"]["category"][] | null
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
      category: "big-bars" | "small-bars" | "dark-chocolate" | "milk-chocolate"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
