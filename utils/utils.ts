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
