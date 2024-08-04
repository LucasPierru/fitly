import { DishTypes } from '@/types/recipes';
import { Database } from '@/types/supabase';

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

export const getMealTimeList =
  (): Database['public']['Enums']['meal_time'][] => {
    const mealTimes: Database['public']['Enums']['meal_time'][] = [
      'breakfast',
      'lunch',
      'dinner',
      'snack'
    ];
    return mealTimes;
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
