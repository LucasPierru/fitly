import { z } from 'zod';

export const updateUserSchema = (t: (arg: string) => string) =>
  z.object({
    height: z.number().min(0, t('errors.isNotNumber')),
    weight: z.number().min(0, t('errors.isNotNumber')),
    birthday: z.date(),
    sex: z.enum(['male', 'female']),
    howActive: z.enum([
      'sedentary',
      'light',
      'moderate',
      'active',
      'very_active'
    ])
  });
