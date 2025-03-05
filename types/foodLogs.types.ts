import { Types } from "mongoose";
import { DefaultProperties } from "./common.types";
import { IUser } from "./users.types";
import { IIngredient } from "./ingredients.types";
import { IMeal } from "./meals.types";

export type IFoodLog = DefaultProperties & {
  user: Types.ObjectId | IUser;
  ingredient?: Types.ObjectId | IIngredient;
  quantity?: number;
  unit?: string;
  meal?: Types.ObjectId | IMeal;
  dishType: string; // e.g.: breakfast, lunch, dinner, snack
};
