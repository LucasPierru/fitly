import { Types } from 'mongoose';
import { DefaultProperties } from './common.types';
import { IIngredient } from './ingredients.types';
import { IUser } from './users.types';

export type Instruction = {
  name: string;
  step: number;
};

export type DishTypes =
  | 'main course'
  | 'side dish'
  | 'dessert'
  | 'appetizer'
  | 'salad'
  | 'bread'
  | 'breakfast'
  | 'soup'
  | 'beverage'
  | 'sauce'
  | 'marinade'
  | 'fingerfood'
  | 'snack'
  | 'drink';

export type IMeal = DefaultProperties & {
  title: string;
  description: string;
  image: string;
  vegetarian: boolean;
  vegan: boolean;
  ketogenic: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  preparationMinutes: number;
  cookingMinutes: number;
  likes: number;
  pricePerServing: number;
  ingredients: {
    ingredient: Types.ObjectId | IIngredient;
    quantity: number;
    unit: string;
  }[];
  servings: number;
  cuisines: string[];
  dishTypes: DishTypes[];
  diets: string[];
  instructions: Instruction[];
  isPublic: boolean;
  isApproved: boolean;
  creator: Types.ObjectId | IUser;
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
};
