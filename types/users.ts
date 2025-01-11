export type Sex = 'male' | 'female';

export type HowActive =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active';

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
  height?: number;
  weight?: number;
  age?: number;
  sex?: Sex;
  howActive?: HowActive;
  goal?: Goal;
};

export type UserBMRData = Pick<
  User,
  'height' | 'weight' | 'age' | 'sex' | 'howActive'
>;
