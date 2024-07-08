export type Sex = 'm' | 'f';

export type HowActive = 'sedentary' | 'moderate' | 'light' | 'very' | 'super';

export type Goal =
  | 'fat_loss'
  | 'muscle_gain'
  | 'improve_stamina'
  | 'maintenance';

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  height?: number | undefined;
  weight: number;
  age: number;
  sex: Sex;
  howActive: HowActive;
  goal: Goal;
};
