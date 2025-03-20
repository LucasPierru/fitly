import { z } from 'zod';

export const createMealPlanSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  meals: z
    .array(
      z.object({
        meal: z.string(),
        ingredient: z.string(),
        quantity: z.number(),
        unit: z.string(),
        dishType: z.string(),
        day: z.string()
      })
    )
    .optional()
});

export const updateMealPlanSchema = z.object({
  _id: z.string().nonempty(),
  name: z.string().optional(),
  description: z.string().optional(),
  meals: z
    .array(
      z.object({
        meal: z.any().optional(),
        ingredient: z.any().optional(),
        quantity: z.number().optional(),
        unit: z.string().optional(),
        dishType: z.string(),
        day: z.string()
      })
    )
    .optional()
});
