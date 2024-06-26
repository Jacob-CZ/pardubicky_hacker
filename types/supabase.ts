export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      examples_private: {
        Row: {
          created_at: string
          exampleId: string
          id: string
          test_cases: Json | null
        }
        Insert: {
          created_at?: string
          exampleId: string
          id?: string
          test_cases?: Json | null
        }
        Update: {
          created_at?: string
          exampleId?: string
          id?: string
          test_cases?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "examples_private_exampleId_fkey"
            columns: ["exampleId"]
            isOneToOne: false
            referencedRelation: "examples_public"
            referencedColumns: ["id"]
          },
        ]
      }
      examples_public: {
        Row: {
          created_at: string
          difficulty: Database["public"]["Enums"]["difficulties"]
          func_name: string | null
          id: string
          instructions: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulties"]
          func_name?: string | null
          id?: string
          instructions?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulties"]
          func_name?: string | null
          id?: string
          instructions?: string | null
          name?: string | null
        }
        Relationships: []
      }
      examples_user: {
        Row: {
          code: string | null
          console_logs: string | null
          created_at: string
          doodles: Json | null
          finish_time: string | null
          id: string
          notes: Json | null
          questionId: string
          started: boolean
          userId: string | null
        }
        Insert: {
          code?: string | null
          console_logs?: string | null
          created_at?: string
          doodles?: Json | null
          finish_time?: string | null
          id?: string
          notes?: Json | null
          questionId: string
          started?: boolean
          userId?: string | null
        }
        Update: {
          code?: string | null
          console_logs?: string | null
          created_at?: string
          doodles?: Json | null
          finish_time?: string | null
          id?: string
          notes?: Json | null
          questionId?: string
          started?: boolean
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "examples_user_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "examples-user_questionId_fkey"
            columns: ["questionId"]
            isOneToOne: false
            referencedRelation: "examples_public"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulties: "easy" | "mid" | "hard" | "impossible"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
