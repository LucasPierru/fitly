import { Types } from 'mongoose';
import { DefaultProperties } from './common.types';
import { IMeal } from './meals.types';
import { IIngredient } from './ingredients.types';
import { IUser } from './users.types';

export type IMealPlan = DefaultProperties & {
  name: string;
  description: string;
  meals: {
    meal?: Types.ObjectId | IMeal;
    ingredient?: Types.ObjectId | IIngredient;
    quantity?: number;
    unit?: string;
    dishType: string; // e.g.: breakfast, lunch, dinner, snack
    day: string; // e.g.: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
  }[];
  user: Types.ObjectId | IUser;
};
