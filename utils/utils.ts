import { Database } from "@/types/supabase";

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

export const getMealTimeList = (): Database["public"]["Enums"]["meal_time"][] => {
  const mealTimes: Database["public"]["Enums"]["meal_time"][] = [
    'breakfast',
    'lunch',
    'dinner',
    'snack',
  ];
  return mealTimes;
};

export const dropDuplicates = <T>(array: Array<T>)=> {
  const uniqueArray = array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  return uniqueArray
}
