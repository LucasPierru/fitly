export type FoodInformation = {
  id: number;
  name: string;
  image: string;
  aisle: string;
  possibleUnits: string[];
};

export type Unit = string;

export type CaloricBreakdown = {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
};
export type WeightPerServing = {
  amount: number;
  unit: Unit;
};
export type Flavonoid = {
  name: string;
  amount: number;
  unit: Unit;
  percentOfDailyNeeds?: number;
};

export type Nutrition = {
  nutrients: Flavonoid[];
  properties: Flavonoid[];
  flavonoids: Flavonoid[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
};

export type EstimatedCost = {
  value: number;
  unit: string;
};

export type FoodInformationDetails = FoodInformation & {
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  unitShort: Unit;
  unitLong: string;
  estimatedCost: EstimatedCost;
  consistency: string;
  shoppingListUnits: string[];
  meta: [];
  nutrition: Nutrition;
  categoryPath: string[];
};
