import { IMealPlan } from "./mealPlans.types";

export type ISavedMealPlan = IMealPlan & {
  name: string;
  description: string;
}