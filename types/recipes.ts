export type RecipeSummary = {
  id: number;
  title: string;
  image: string;
  imageType: string;
};

export type Ent = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type Step = {
  number: number;
  step: string;
  ingredients: Ent[];
  equipment: Ent[];
};

export type AnalyzedInstruction = {
  name: string;
  steps: Step[];
};
export type Metric = {
  amount: number;
  unitShort: string;
  unitLong: string;
};
export type Measures = {
  us: Metric;
  metric: Metric;
};
export type ExtendedIngredient = {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: Measures;
};

export type Unit = '' | 'mg' | 'g' | 'µg' | 'kcal' | 'IU' | '%';

export type CaloricBreakdown = {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
};

export type Flavonoid = {
  name: string;
  amount: number;
  unit: Unit;
  percentOfDailyNeeds?: number;
};

export type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Flavonoid[];
};

export type WeightPerServing = {
  amount: number;
  unit: Unit;
};

export type Nutrition = {
  nutrients: Flavonoid[];
  properties: Flavonoid[];
  flavonoids: Flavonoid[];
  ingredients: Ingredient[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
};

export type DishTypes = 'main course' | 'side dish' | 'dessert' | 'appetizer' | 'salad' | 'bread' | 'breakfast' | 'soup' | 'beverage' | 'sauce' | 'marinade' | 'fingerfood' | 'snack' | 'drink'

export type RecipeInformation = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: null;
  cookingMinutes: null;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  nutrition: Nutrition;
  summary: string;
  cuisines: string[];
  dishTypes: DishTypes[];
  diets: string[];
  occasions: string[];
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  originalId: null;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
};
