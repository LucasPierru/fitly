'use server';

import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { RecipeInformation } from '@/types/recipes';
import { capitalizeWord } from '@/utils/utils';
import { getIngredientsData } from './ingredients';
import { convertSpoonacularToSupabaseMeal } from './recipes';

export const getMealPlans = async () => {
  try {
    const supabase = createClient();
    const userId = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } = await supabase
      .from('meal_plans')
      .select('id, name')
      .eq('user_id', userId);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

type MealPlanDetailsData = {
  id: string;
  name: string;
  description: string;
  meal_plan_meals: {
    id: string;
    time: Database['public']['Enums']['meal_time'];
    meals: {
      id: string;
      cost_per_serving: number;
      picture: string;
      og_id: number;
    };
  }[];
};

export const getMealPlansDetails = async () => {
  try {
    const supabase = createClient();
    const userId = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } = await supabase
      .from('meal_plans')
      .select(
        'id, name, description, meal_plan_meals(id, meals(id, cost_per_serving, picture, og_id), time)'
      )
      .eq('user_id', userId)
      .returns<MealPlanDetailsData[]>();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

type MealPlanData = {
  plan: {
    newMealPlanName?: string;
    planId?: string;
  };
  mealTime: Database['public']['Enums']['meal_time'];
  mealDay: Database['public']['Enums']['day'];
  recipe: RecipeInformation;
};

export const addMealPlan = async ({
  plan,
  mealTime,
  mealDay,
  recipe
}: MealPlanData) => {
  try {
    const supabase = createClient();
    const userId = (await supabase.auth.getUser()).data.user?.id;

    const formattedIngredients = recipe.extendedIngredients.map(
      (ingredient) => ({
        ingredient: {
          id: ingredient.id,
          name: capitalizeWord(ingredient.name),
          possibleUnits: [ingredient.measures.metric.unitShort]
        },
        quantity: ingredient.measures.metric.amount,
        unit: ingredient.measures.metric.unitShort
      })
    );

    const ingredientsData = await getIngredientsData(formattedIngredients);
    const totalCost = ingredientsData.reduce((acc, currentValue) => {
      return acc + currentValue.price;
    }, 0);
    const meal = convertSpoonacularToSupabaseMeal(
      recipe,
      totalCost,
      userId as string
    );

    const mealPlan = {
      id: plan.planId || null,
      name: plan.newMealPlanName,
      user_id: userId,
      day: mealDay,
      meal_time: mealTime
    };

    const { data, error } = await supabase.rpc('insert_meal_plan', {
      meal_data: meal,
      ingredients_data: ingredientsData,
      meal_plan_data: mealPlan
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
