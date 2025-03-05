import { Types } from "mongoose";
import { DefaultProperties } from "./common.types";
import { IMeal } from "./meals.types";
import { IUser } from "./users.types";

export type IUserMeal = DefaultProperties & {
  meal: Types.ObjectId | IMeal;
  user: Types.ObjectId | IUser;
};
