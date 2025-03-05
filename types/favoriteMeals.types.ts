import { Types } from "mongoose";
import { DefaultProperties } from "./common.types";
import { IIngredient } from "./ingredients.types";
import { IMeal } from "./meals.types";
import { IUser } from "./users.types";

export type IFavoriteMeal = DefaultProperties & {
  user: Types.ObjectId | IUser;
  meal: Types.ObjectId | IMeal;
  ingredient: Types.ObjectId | IIngredient;
};
