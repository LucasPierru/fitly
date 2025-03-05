import { Types } from "mongoose";
import { DefaultProperties } from "./common.types";
import { IIngredientCategory } from "./ingredientCategories.types";

export type AlternateUnit = {
  amount: number;
  unit: string;
  gramWeight: number;
};

export type Cost = {
  value: number;
  unit: string;
};

export type Nutrient = {
  name: string;
  amount: number;
  unit: string;
};

export type IIngredient = DefaultProperties & {
  usdaId: number;
  name: string;
  amount: number;
  unit: string;
  unitShort: string;
  alternateUnits: AlternateUnit[];
  estimatedCost: Cost;
  image: string;
  category: Types.ObjectId | IIngredientCategory;
  nutrients: Nutrient[];
};
