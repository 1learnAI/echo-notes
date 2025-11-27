export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_fit_daily_summaries: {
        Row: {
          created_at: string
          date: string
          foods_count: number | null
          id: string
          meals_breakdown: Json | null
          target_calories: number | null
          total_calories: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          foods_count?: number | null
          id?: string
          meals_breakdown?: Json | null
          target_calories?: number | null
          total_calories?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          foods_count?: number | null
          id?: string
          meals_breakdown?: Json | null
          target_calories?: number | null
          total_calories?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_fit_food_logs: {
        Row: {
          calories_per_serving: number
          confidence_score: number | null
          created_at: string
          food_name: string
          id: string
          image_url: string
          logged_date: string
          meal_type: string | null
          nutritional_info: Json | null
          servings: number | null
          total_calories: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          calories_per_serving: number
          confidence_score?: number | null
          created_at?: string
          food_name: string
          id?: string
          image_url: string
          logged_date?: string
          meal_type?: string | null
          nutritional_info?: Json | null
          servings?: number | null
          total_calories?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          calories_per_serving?: number
          confidence_score?: number | null
          created_at?: string
          food_name?: string
          id?: string
          image_url?: string
          logged_date?: string
          meal_type?: string | null
          nutritional_info?: Json | null
          servings?: number | null
          total_calories?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_fit_profiles: {
        Row: {
          activity_level: string | null
          age: number | null
          avatar_url: string | null
          created_at: string
          dietary_preferences: string[] | null
          email: string
          full_name: string | null
          gender: string | null
          goal: string | null
          height_cm: number | null
          id: string
          onboarding_completed: boolean | null
          target_calories: number | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          dietary_preferences?: string[] | null
          email: string
          full_name?: string | null
          gender?: string | null
          goal?: string | null
          height_cm?: number | null
          id: string
          onboarding_completed?: boolean | null
          target_calories?: number | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          dietary_preferences?: string[] | null
          email?: string
          full_name?: string | null
          gender?: string | null
          goal?: string | null
          height_cm?: number | null
          id?: string
          onboarding_completed?: boolean | null
          target_calories?: number | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      ai_fit_subscription_plans: {
        Row: {
          created_at: string
          daily_food_limit: number
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          price_monthly: number
          stripe_price_id: string | null
        }
        Insert: {
          created_at?: string
          daily_food_limit: number
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          price_monthly: number
          stripe_price_id?: string | null
        }
        Update: {
          created_at?: string
          daily_food_limit?: number
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_monthly?: number
          stripe_price_id?: string | null
        }
        Relationships: []
      }
      ai_fit_usage_tracking: {
        Row: {
          created_at: string
          daily_limit: number
          date: string
          foods_logged_today: number
          id: string
          plan_name: string
          reset_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_limit?: number
          date?: string
          foods_logged_today?: number
          id?: string
          plan_name?: string
          reset_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          daily_limit?: number
          date?: string
          foods_logged_today?: number
          id?: string
          plan_name?: string
          reset_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_fit_user_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_fit_user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "ai_fit_subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      aichatbot_chats: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      aichatbot_messages: {
        Row: {
          chat_id: string
          content: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          chat_id: string
          content: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          chat_id?: string
          content?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "aichatbot_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "aichatbot_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      aichatbot_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          plan: Database["public"]["Enums"]["aichatbot_plan_type"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_end: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          plan?: Database["public"]["Enums"]["aichatbot_plan_type"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["aichatbot_plan_type"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      aichatbot_usage: {
        Row: {
          created_at: string
          id: string
          messages_sent: number
          reset_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          messages_sent?: number
          reset_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          messages_sent?: number
          reset_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      allin1_executions: {
        Row: {
          created_at: string | null
          emails: Json | null
          id: string
          images: Json | null
          summary: string | null
          title: string | null
          url: string | null
          user_id: string | null
          videos: Json | null
        }
        Insert: {
          created_at?: string | null
          emails?: Json | null
          id?: string
          images?: Json | null
          summary?: string | null
          title?: string | null
          url?: string | null
          user_id?: string | null
          videos?: Json | null
        }
        Update: {
          created_at?: string | null
          emails?: Json | null
          id?: string
          images?: Json | null
          summary?: string | null
          title?: string | null
          url?: string | null
          user_id?: string | null
          videos?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "allin1_executions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "allin1_users"
            referencedColumns: ["id"]
          },
        ]
      }
      allin1_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password_hash: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password_hash: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password_hash?: string
        }
        Relationships: []
      }
      availability_slots: {
        Row: {
          created_at: string | null
          day_of_week: number
          end_time: string
          id: string
          meeting_link_id: string
          start_time: string
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          end_time: string
          id?: string
          meeting_link_id: string
          start_time: string
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          id?: string
          meeting_link_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_slots_meeting_link_id_fkey"
            columns: ["meeting_link_id"]
            isOneToOne: false
            referencedRelation: "meeting_links"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booker_email: string
          booker_name: string
          booking_date: string
          booking_time: string
          created_at: string | null
          id: string
          meeting_link_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          booker_email: string
          booker_name: string
          booking_date: string
          booking_time: string
          created_at?: string | null
          id?: string
          meeting_link_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          booker_email?: string
          booker_name?: string
          booking_date?: string
          booking_time?: string
          created_at?: string | null
          id?: string
          meeting_link_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_meeting_link_id_fkey"
            columns: ["meeting_link_id"]
            isOneToOne: false
            referencedRelation: "meeting_links"
            referencedColumns: ["id"]
          },
        ]
      }
      grammarly_executions: {
        Row: {
          corrected_text: string | null
          created_at: string | null
          id: string
          meta: Json | null
          original_text: string | null
          page_title: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          corrected_text?: string | null
          created_at?: string | null
          id?: string
          meta?: Json | null
          original_text?: string | null
          page_title?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          corrected_text?: string | null
          created_at?: string | null
          id?: string
          meta?: Json | null
          original_text?: string | null
          page_title?: string | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grammarly_executions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "grammarly_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      grammarly_profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          password_hash: string
          salt: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          password_hash: string
          salt: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          password_hash?: string
          salt?: string
        }
        Relationships: []
      }
      grammarly_user_keys: {
        Row: {
          created_at: string | null
          id: string
          key_label: string | null
          masked_key: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key_label?: string | null
          masked_key?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key_label?: string | null
          masked_key?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grammarly_user_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "grammarly_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          created_at: string
          file_size: number
          filename: string
          height: number | null
          id: string
          mime_type: string
          original_name: string
          storage_path: string
          updated_at: string
          user_id: string
          width: number | null
        }
        Insert: {
          created_at?: string
          file_size: number
          filename: string
          height?: number | null
          id?: string
          mime_type: string
          original_name: string
          storage_path: string
          updated_at?: string
          user_id: string
          width?: number | null
        }
        Update: {
          created_at?: string
          file_size?: number
          filename?: string
          height?: number | null
          id?: string
          mime_type?: string
          original_name?: string
          storage_path?: string
          updated_at?: string
          user_id?: string
          width?: number | null
        }
        Relationships: []
      }
      meeting_links: {
        Row: {
          created_at: string | null
          description: string | null
          duration: number
          id: string
          is_active: boolean | null
          slug: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: number
          id?: string
          is_active?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: number
          id?: string
          is_active?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      new_to_do_list: {
        Row: {
          completed: boolean
          created_at: string
          id: string
          text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          id?: string
          text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          id?: string
          text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      photo_vault: {
        Row: {
          created_at: string
          file_path: string
          height: number | null
          id: string
          title: string
          user_id: string
          width: number | null
        }
        Insert: {
          created_at?: string
          file_path: string
          height?: number | null
          id?: string
          title: string
          user_id: string
          width?: number | null
        }
        Update: {
          created_at?: string
          file_path?: string
          height?: number | null
          id?: string
          title?: string
          user_id?: string
          width?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          created_at: string
          id: string
          is_available: boolean
          meeting_link_id: string
          slot_date: string
          slot_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_available?: boolean
          meeting_link_id: string
          slot_date: string
          slot_time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_available?: boolean
          meeting_link_id?: string
          slot_date?: string
          slot_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_slots_meeting_link_id_fkey"
            columns: ["meeting_link_id"]
            isOneToOne: false
            referencedRelation: "meeting_links"
            referencedColumns: ["id"]
          },
        ]
      }
      todos: {
        Row: {
          completed: boolean
          created_at: string
          id: string
          text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          id?: string
          text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          id?: string
          text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transcriptions: {
        Row: {
          action_items: Json | null
          audio_url: string | null
          created_at: string
          id: string
          keywords: string[] | null
          summary: string | null
          title: string | null
          transcription: string
          user_id: string
          word_frequencies: Json | null
        }
        Insert: {
          action_items?: Json | null
          audio_url?: string | null
          created_at?: string
          id?: string
          keywords?: string[] | null
          summary?: string | null
          title?: string | null
          transcription: string
          user_id: string
          word_frequencies?: Json | null
        }
        Update: {
          action_items?: Json | null
          audio_url?: string | null
          created_at?: string
          id?: string
          keywords?: string[] | null
          summary?: string | null
          title?: string | null
          transcription?: string
          user_id?: string
          word_frequencies?: Json | null
        }
        Relationships: []
      }
      usage_tracking: {
        Row: {
          created_at: string
          current_usage: number
          email: string
          id: string
          max_usage: number
          plan: string
          reset_date: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_usage?: number
          email: string
          id?: string
          max_usage?: number
          plan?: string
          reset_date?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_usage?: number
          email?: string
          id?: string
          max_usage?: number
          plan?: string
          reset_date?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      reset_monthly_usage: { Args: never; Returns: undefined }
    }
    Enums: {
      aichatbot_plan_type: "free" | "pro" | "pro_plus"
      subscription_tier: "free" | "pro" | "pro_plus"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      aichatbot_plan_type: ["free", "pro", "pro_plus"],
      subscription_tier: ["free", "pro", "pro_plus"],
    },
  },
} as const
