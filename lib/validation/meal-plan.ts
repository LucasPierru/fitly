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
