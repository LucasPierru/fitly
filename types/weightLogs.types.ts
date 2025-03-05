import { Types } from "mongoose";
import { DefaultProperties } from "./common.types";
import { IUser } from "./users.types";

export type IWeightLog = DefaultProperties & {
  user: Types.ObjectId | IUser;
  weight: number;
  bodyFatPercentage: number;
};
