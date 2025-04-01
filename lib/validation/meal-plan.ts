import { z } from 'zod';

export const createMealPlanSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  meals: z.array(
    z.object({
      meal: z.any().optional(),
      ingredient: z.any().optional(),
      quantity: z.number().optional(),
      unit: z.string().optional(),
      dishType: z.string().optional(),
      day: z.string()
    })
  )
});

export const updateMealPlanSchema = z.object({
  _id: z.string().optional(),
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
