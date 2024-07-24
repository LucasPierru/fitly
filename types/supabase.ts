export type Database = {
  public: {
    Tables: {
      foods: {
        Row: {
          alcohol_g: number | null
          caffeine_mg: number | null
          carbs_g: number
          cholesterol_mg: number | null
          created_at: string
          fat_g: number
          fiber_g: number | null
          id: string
          iron_mg: number | null
          kcal: number
          lactose_g: number | null
          name: string
          picture: string | null
          potassium_mg: number | null
          price: number | null
          protein_g: number
          saturated_fat_g: number | null
          sodium_mg: number | null
          sugar_g: number | null
          water_g: number | null
        }
        Insert: {
          alcohol_g?: number | null
          caffeine_mg?: number | null
          carbs_g: number
          cholesterol_mg?: number | null
          created_at?: string
          fat_g: number
          fiber_g?: number | null
          id?: string
          iron_mg?: number | null
          kcal: number
          lactose_g?: number | null
          name: string
          picture?: string | null
          potassium_mg?: number | null
          price?: number | null
          protein_g: number
          saturated_fat_g?: number | null
          sodium_mg?: number | null
          sugar_g?: number | null
          water_g?: number | null
        }
        Update: {
          alcohol_g?: number | null
          caffeine_mg?: number | null
          carbs_g?: number
          cholesterol_mg?: number | null
          created_at?: string
          fat_g?: number
          fiber_g?: number | null
          id?: string
          iron_mg?: number | null
          kcal?: number
          lactose_g?: number | null
          name?: string
          picture?: string | null
          potassium_mg?: number | null
          price?: number | null
          protein_g?: number
          saturated_fat_g?: number | null
          sodium_mg?: number | null
          sugar_g?: number | null
          water_g?: number | null
        }
        Relationships: []
      }
      ingredient_categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      ingredient_categories_association: {
        Row: {
          category_id: string
          created_at: string
          id: string
          ingredient_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          ingredient_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          ingredient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_categories_association_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ingredient_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredient_categories_association_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_units: {
        Row: {
          created_at: string
          id: string
          ingredient_id: string
          unit_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient_id: string
          unit_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ingredient_id?: string
          unit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_units_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredient_units_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          alcohol_g: number | null
          caffeine_mg: number | null
          calories_kcal: number
          carbohydratess_g: number
          cholesterol_mg: number | null
          created_at: string
          fat_g: number
          fiber_g: number | null
          id: string
          iron_mg: number | null
          name: string
          og_id: number
          picture: string | null
          potassium_mg: number | null
          price: number | null
          protein_g: number
          saturated_fat_g: number | null
          sodium_mg: number | null
          sugar_g: number | null
        }
        Insert: {
          alcohol_g?: number | null
          caffeine_mg?: number | null
          calories_kcal: number
          carbohydratess_g: number
          cholesterol_mg?: number | null
          created_at?: string
          fat_g: number
          fiber_g?: number | null
          id?: string
          iron_mg?: number | null
          name: string
          og_id: number
          picture?: string | null
          potassium_mg?: number | null
          price?: number | null
          protein_g: number
          saturated_fat_g?: number | null
          sodium_mg?: number | null
          sugar_g?: number | null
        }
        Update: {
          alcohol_g?: number | null
          caffeine_mg?: number | null
          calories_kcal?: number
          carbohydratess_g?: number
          cholesterol_mg?: number | null
          created_at?: string
          fat_g?: number
          fiber_g?: number | null
          id?: string
          iron_mg?: number | null
          name?: string
          og_id?: number
          picture?: string | null
          potassium_mg?: number | null
          price?: number | null
          protein_g?: number
          saturated_fat_g?: number | null
          sodium_mg?: number | null
          sugar_g?: number | null
        }
        Relationships: []
      }
      meal_foods: {
        Row: {
          created_at: string
          id: string
          ingredient_id: string
          meal_id: string
          quantity: number
          unit: string
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient_id: string
          meal_id: string
          quantity: number
          unit: string
        }
        Update: {
          created_at?: string
          id?: string
          ingredient_id?: string
          meal_id?: string
          quantity?: number
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_foods_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_foods_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_instructions: {
        Row: {
          created_at: string
          id: string
          instruction: string
          meal_id: string
          step: number
        }
        Insert: {
          created_at?: string
          id?: string
          instruction: string
          meal_id: string
          step: number
        }
        Update: {
          created_at?: string
          id?: string
          instruction?: string
          meal_id?: string
          step?: number
        }
        Relationships: [
          {
            foreignKeyName: "meal_instructions_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plan_meals: {
        Row: {
          created_at: string
          day: Database["public"]["Enums"]["day"]
          id: string
          meal_id: string
          meal_plan_id: string
          time: Database["public"]["Enums"]["meal_time"]
        }
        Insert: {
          created_at?: string
          day: Database["public"]["Enums"]["day"]
          id?: string
          meal_id: string
          meal_plan_id: string
          time: Database["public"]["Enums"]["meal_time"]
        }
        Update: {
          created_at?: string
          day?: Database["public"]["Enums"]["day"]
          id?: string
          meal_id?: string
          meal_plan_id?: string
          time?: Database["public"]["Enums"]["meal_time"]
        }
        Relationships: [
          {
            foreignKeyName: "meal_plan_meals_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plan_meals_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "meal_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plans: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          cost_per_serving: number
          created_at: string
          dairy_free: boolean | null
          description: string
          gluten_free: boolean | null
          id: string
          name: string
          picture: string
          preparation_time: number
          servings: number
          time: Database["public"]["Enums"]["meal_time"]
          vegan: boolean | null
          vegetarian: boolean | null
        }
        Insert: {
          cost_per_serving: number
          created_at?: string
          dairy_free?: boolean | null
          description: string
          gluten_free?: boolean | null
          id?: string
          name: string
          picture: string
          preparation_time: number
          servings: number
          time: Database["public"]["Enums"]["meal_time"]
          vegan?: boolean | null
          vegetarian?: boolean | null
        }
        Update: {
          cost_per_serving?: number
          created_at?: string
          dairy_free?: boolean | null
          description?: string
          gluten_free?: boolean | null
          id?: string
          name?: string
          picture?: string
          preparation_time?: number
          servings?: number
          time?: Database["public"]["Enums"]["meal_time"]
          vegan?: boolean | null
          vegetarian?: boolean | null
        }
        Relationships: []
      }
      units: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          age: number
          birthday: string | null
          country_id: string | null
          created_at: string
          email: string
          first_name: string
          goal: Database["public"]["Enums"]["fitness_goal"]
          height: number
          how_active: Database["public"]["Enums"]["how_active"]
          id: string
          last_name: string
          phone: string | null
          picture: string | null
          sex: Database["public"]["Enums"]["sex"]
          weight: number
        }
        Insert: {
          age: number
          birthday?: string | null
          country_id?: string | null
          created_at?: string
          email: string
          first_name: string
          goal: Database["public"]["Enums"]["fitness_goal"]
          height: number
          how_active: Database["public"]["Enums"]["how_active"]
          id?: string
          last_name: string
          phone?: string | null
          picture?: string | null
          sex: Database["public"]["Enums"]["sex"]
          weight: number
        }
        Update: {
          age?: number
          birthday?: string | null
          country_id?: string | null
          created_at?: string
          email?: string
          first_name?: string
          goal?: Database["public"]["Enums"]["fitness_goal"]
          height?: number
          how_active?: Database["public"]["Enums"]["how_active"]
          id?: string
          last_name?: string
          phone?: string | null
          picture?: string | null
          sex?: Database["public"]["Enums"]["sex"]
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
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
      day:
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"
      fitness_goal:
        | "fat_loss"
        | "muscle_gain"
        | "improve_stamina"
        | "maintenance"
      how_active: "sedentary" | "light" | "moderate" | "very" | "super"
      meal_time: "breakfast" | "lunch" | "dinner" | "snack"
      sex: "m" | "f"
      unit: "grams" | "milliliters"
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
