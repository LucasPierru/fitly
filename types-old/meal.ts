export type CreateMeal = {
  name: string;
  description: string;
  ingredients?: {
    id: number;
    name: string;
    quantity: number;
    unit: string;
  }[];
  instructions?: {
    content: string;
  }[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  pricePerServing: number;
};
