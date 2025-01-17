import { FoodInformationDetails } from './foods';

export type CreateMeal = {
  name: string;
  description: string;
  ingredients?: {
    ingredient: FoodInformationDetails;
    quantity: number;
    unit: string;
  }[];
  instructions?: {
    content: string;
  }[];
};
