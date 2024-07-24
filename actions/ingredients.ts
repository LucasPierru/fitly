'use server';

import { Database } from '@/types/supabase';
import { FoodInformation, FoodInformationDetails } from '@/types/foods';
import { createClient } from '@/utils/supabase/server';
import { capitalizeWord, getMacrosList } from '@/utils/utils';

const BASE_URL = 'https://api.spoonacular.com';

type Ingredient = {ingredient: Database['public']['Tables']['ingredients']['Row']; possible_units: string[]; categories: string[];}
type IngredientCategories = Database['public']['Tables']['ingredient_categories_association']['Insert']
type IngredientUnits = Database['public']['Tables']['ingredient_units']['Insert'];

export const getIngredientInformation = async (
  id: number,
  amount: number,
  unit: string
): Promise<FoodInformationDetails | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/food/ingredients/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&amount=${amount}&unit=${unit}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const createRecipe = async ({
  title,
  description,
  ingredients,
  instructions
}: {
  title: string;
  description: string;
  ingredients: {
    ingredient: Pick<FoodInformation, 'name' | 'id' | 'possibleUnits'>;
    quantity: number;
    unit: string;
  }[];
  instructions?: { content: string }[];
}) => {
  try {
    const macrosList = getMacrosList();

    const ingredientsData = await Promise.all(
      ingredients.map(async (ingredient) => {
        const ingredientInformation = await getIngredientInformation(
          ingredient.ingredient.id,
          100,
          'g'
        );
        const nutrients: Ingredient = ingredientInformation?.nutrition.nutrients.reduce(
          (acc: Ingredient, nutrient) => {
            if (macrosList.includes(nutrient.name)) {
              return {
                ...acc,
                [`${nutrient.name.toLowerCase().replace(' ', '_')}_${nutrient.unit}`]:
                  nutrient.amount
              };
            }
            return acc;
          },
          {} as Ingredient
        ) as Ingredient;
        return {
          ingredient: {
            ...nutrients?.ingredient,
            name: capitalizeWord(ingredientInformation?.originalName as string),
            price: ingredientInformation?.estimatedCost.value as number,
            og_id: ingredientInformation?.id as number
          },
          possible_units: ingredientInformation?.possibleUnits as string[],
          categories: ingredientInformation?.categoryPath as string[]
        };
      })
    );

    const ingredientsToInsert = ingredientsData.map(
      (ingredient) => ingredient.ingredient
    );
    const categoriesList = ingredientsData.flatMap(
      (ingredient) => (ingredient.categories)
    );
    const unitsList = ingredientsData.flatMap(
      (ingredient) => (ingredient.possible_units)
    );
    
    const insertedIngredientsData = await insertIngredients(ingredientsToInsert);
    const insertedCategoriesData = await insertIngredientCategories(categoriesList);
    const insertedUnitsData = await insertIngredientUnits(unitsList);

    const ingredientsCategories: IngredientCategories[] = ingredientsData.map(ingredient => {
      const ingredientId = insertedIngredientsData.find(ing => ing.og_id === ingredient.ingredient.og_id).id
      const categoryIds = insertedCategoriesData.filter(cat => ingredient.categories.includes(cat.name))
      const data = categoryIds.map(category => ({
        category_id: category.id,
        ingredient_id: ingredientId
      }))
      return data
    }).flat()

    const ingredientsUnits: IngredientUnits[] = ingredientsData.map(ingredient => {
      const ingredientId = insertedIngredientsData.find(ing => ing.og_id === ingredient.ingredient.og_id).id
      const unitIds = insertedUnitsData.filter(unit => ingredient.possible_units.includes(unit.name))
      const data = unitIds.map(unit => ({
        unit_id: unit.id,
        ingredient_id: ingredientId
      }))
      return data
    }).flat()

    const insertedIngredientsCategoriesData = await insertIngredientCategoriesAssociation(ingredientsCategories);
    const insertedIngredientsUnitsData = await insertIngredientUnitsAssociation(ingredientsUnits);

    console.log(ingredientsData);

    return;
    /* const { data, error } = await supabase.from('ingredients').upsert({}, onConflict: 'og_id');
    if (error) throw error;
    return data; */
  } catch (error) {
    return null;
  }
};

const insertIngredients = async(ingredients: Ingredient['ingredient'][]) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('ingredients').upsert(ingredients, {onConflict: 'og_id'}).select();
  if (error) throw error;
  return data;
}

const insertIngredientCategories = async(categories: string[]) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('ingredient_categories').upsert(categories, {onConflict: 'name'}).select();
  if (error) throw error;
  return data
}

const insertIngredientUnits = async(units: string[]) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('units').upsert(units, {onConflict: 'name'}).select();
  if (error) throw error;
  return data
}

const insertIngredientCategoriesAssociation = async(ingredientsCategories: IngredientCategories[]) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('ingredient_categories_association').upsert(ingredientsCategories, {onConflict: 'category_id, ingredient_id'}).select();
  if (error) throw error;
  return data
}

const insertIngredientUnitsAssociation = async(ingredientsUnits: IngredientUnits[]) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('ingredient_units').upsert(ingredientsUnits, {onConflict: 'unit_id, ingredient_id'}).select();
  if (error) throw error;
  return data
}
