'use server';

import { FoodInformation } from '@/types/foods';
import { RecipeSummary, RecipeInformation } from '@/types/recipes';
import { createClient } from '@/utils/supabase/server';
import { getMealTypeList } from '@/utils/utils';

const BASE_URL = 'https://api.spoonacular.com';

export const ingredientSearchAutocomplete = async (
  query: string
): Promise<FoodInformation[] | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/food/ingredients/autocomplete?query=${query}&number=5&metaInformation=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    return res.json();
  } catch (error) {
    return null;
  }
};

export const searchRecipes = async (
  query: string
): Promise<RecipeSummary[] | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/recipes/complexSearch?query=${query}&number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    const data: { results: RecipeSummary[] } = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
};

export const getRecipe = async (
  id: string
): Promise<RecipeInformation | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&includeNutrition=true`
    );
    const data: RecipeInformation = await res.json();

    return data;
  } catch (error) {
    return null;
  }
};

export const getMealFromRecipes = async (id: number) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('meals')
      .select('id')
      .eq('og_id', id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    return null;
  }
};

export const convertSpoonacularToSupabaseMeal = (
  recipe: RecipeInformation,
  totalCost: number,
  authorId: string
) => {
  const costPerServing = totalCost / recipe.servings;
  const mealTypes = getMealTypeList();
  const filteredTypes = mealTypes.filter((value) =>
    recipe.dishTypes.includes(value)
  );
  const steps = recipe.analyzedInstructions.flatMap(
    (instruction) => instruction.steps
  );
  const instructions = steps.map((instruction) => ({
    content: instruction.step
  }));

  const meal = {
    name: recipe.title,
    description: recipe.title,
    picture: recipe.image,
    preparation_time: recipe.readyInMinutes,
    servings: recipe.servings,
    cost_per_serving: costPerServing,
    vegetarian: recipe.vegetarian,
    vegan: recipe.vegan,
    gluten_free: recipe.glutenFree,
    dairy_free: recipe.dairyFree,
    instructions: instructions.map((ins, index) => ({
      instruction: ins.content,
      step: index + 1
    })),
    author_id: authorId,
    meal_types: filteredTypes.map((type) => ({ content: type })),
    og_id: recipe.id
  };

  return meal;
};
