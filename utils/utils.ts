import { DishTypes, RecipeInformation } from '@/types/recipes';
import { Flavonoid } from '@/types/foods';

export const formatPhoneNumber = (phoneNumber: string) => {
  let newPhoneNumber;
  if (phoneNumber?.length === 11 && !phoneNumber.includes('-')) {
    const arr = phoneNumber.split('');
    arr.shift();
    newPhoneNumber = arr.join('');
  } else newPhoneNumber = phoneNumber;
  const regexPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  if (!newPhoneNumber || regexPhone.test(newPhoneNumber)) return newPhoneNumber;
  newPhoneNumber = newPhoneNumber.replace(/[^\d]/g, '');

  if (newPhoneNumber?.length < 4) return newPhoneNumber;
  if (newPhoneNumber?.length < 7)
    return `${newPhoneNumber.slice(0, 3)}-${newPhoneNumber.slice(3)}`;
  return `${newPhoneNumber.slice(0, 3)}-${newPhoneNumber.slice(3, 6)}-${newPhoneNumber.slice(6)}`;
};

export const capitalizeWord = (word: string) => {
  const firstLetter = word.charAt(0).toUpperCase();
  const remainingLetters = word.substring(1);

  return firstLetter + remainingLetters;
};

export const getMacrosList = () => {
  const macrosList = [
    'Fiber',
    'Fat',
    'Sugar',
    'Sodium',
    'Iron',
    'Cholesterol',
    'Calories',
    'Protein',
    'Alcohol',
    'Carbohydrates',
    'Caffeine',
    'Saturated Fat',
    'Potassium'
  ];
  return macrosList;
};

export const getMealTypeList = (): DishTypes[] => {
  const mealTimes: DishTypes[] = [
    'main course',
    'side dish',
    'dessert',
    'appetizer',
    'salad',
    'bread',
    'breakfast',
    'soup',
    'beverage',
    'sauce',
    'marinade',
    'fingerfood',
    'snack',
    'drink'
  ];
  return mealTimes;
};

export const dropDuplicates = <T>(array: Array<T>) => {
  const uniqueArray = array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  return uniqueArray;
};

export const checkExternalUrl = (url: string) => {
  return url.includes('https');
};

export const removeFirstChar = (url: string) => {
  const name = url.substring(1);
  return name;
};

export const mergeArrays = <T extends { id: string }>(arr1: T[], arr2: T[]) => {
  if (arr1.length === 0) return arr2;
  if (arr2.length === 0) return arr1;

  const combinedArray = [...arr1, ...arr2];

  const uniqueArray = combinedArray.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    }
    return acc;
  }, [] as T[]);

  return uniqueArray;
};

export function getStartOfWeek(date = new Date()) {
  const dayOfWeek = date.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
  const daysSinceMonday = (dayOfWeek + 6) % 7; // Adjust so Monday is 0, ..., Sunday is 6
  const monday = new Date(date); // Clone the date
  monday.setDate(date.getDate() - daysSinceMonday); // Go back to Monday
  monday.setHours(0, 0, 0, 0); // Reset time to start of the day
  return monday;
}

interface BMRParams {
  weight: number; // in kg
  height: number; // in cm
  age: number;
  sex: 'male' | 'female';
  howActive: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9
};

export const calculateBMR = ({
  weight,
  height,
  age,
  sex,
  howActive
}: BMRParams) => {
  // Mifflin-St Jeor Equation
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  bmr = sex === 'male' ? bmr + 5 : bmr - 161;

  // Apply activity multiplier
  const tdee = bmr * ACTIVITY_MULTIPLIERS[howActive];

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    maintenance: Math.round(tdee),
    weightLoss: Math.round(tdee - 500), // 500 calorie deficit
    weightGain: Math.round(tdee + 500) // 500 calorie surplus
  };
};

export const getSelectNutrients = (recipe: RecipeInformation) => {
  const { nutrients } = recipe.nutrition;
  const selectNutrients = nutrients.reduce(
    (acc, nutrient) => {
      if (nutrient.name === 'Calories')
        acc.calories = Math.round(nutrient.amount);
      if (nutrient.name === 'Protein')
        acc.protein = Math.round(nutrient.amount);
      if (nutrient.name === 'Carbohydrates')
        acc.carbs = Math.round(nutrient.amount);
      if (nutrient.name === 'Fat') acc.fat = Math.round(nutrient.amount);
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return selectNutrients;
};

export const calculateMacros = (nutrients: Flavonoid[]) => {
  return nutrients.reduce(
    (acc, nutrient) => {
      if (nutrient.name === 'Calories')
        acc.calories += Math.round(nutrient.amount);
      if (nutrient.name === 'Protein')
        acc.protein += Math.round(nutrient.amount);
      if (nutrient.name === 'Carbohydrates')
        acc.carbs += Math.round(nutrient.amount);
      if (nutrient.name === 'Fat') acc.fat += Math.round(nutrient.amount);
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

export const getIngredientsListString = (recipe: RecipeInformation) => {
  const ingredientsList = recipe.nutrition.ingredients.map((ingredient) => {
    return ingredient.name;
  });
  return ingredientsList.join(', ');
};

export const calculateAgeFromBirthday = (birthday: string) => {
  const now = new Date().getTime();
  const timeDiff = Math.abs(now - new Date(birthday).getTime());
  const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);

  return age;
};
