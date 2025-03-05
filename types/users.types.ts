import { Types } from 'mongoose';
import { ISubscription } from './subscription.types';

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

export type IUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  birthday?: Date;
  bmr?: number;
  sex: Sex;
  howActive: HowActive;
  goal: Goal;
  stripeCustomerId?: string;
  subscription?: Types.ObjectId | ISubscription;
};
