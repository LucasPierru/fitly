import { z } from 'zod';

export const formMealSchema = (t: (arg: string) => string) =>
  z.object({
    title: z.string().nonempty({ message: t('errors.isRequired') }),
    description: z.string().nonempty({ message: t('errors.isRequired') }),
    preparationMinutes: z.coerce.number().min(0).optional(),
    cookingMinutes: z.coerce.number().min(0).optional(),
    pricePerServing: z.number().optional(),
    servings: z.coerce.number().min(0).optional(),
    vegetarian: z.boolean().optional(),
    vegan: z.boolean().optional(),
    glutenFree: z.boolean().optional(),
    dairyFree: z.boolean().optional(),
    veryHealthy: z.boolean().optional(),
    cheap: z.boolean().optional(),
    veryPopular: z.boolean().optional(),
    sustainable: z.boolean().optional(),
    nutrition: z
      .object({
        nutrients: z
          .array(
            z.object({
              name: z.string(),
              amount: z.number()
            })
          )
          .optional()
      })
      .optional(),
    ingredients: z
      .array(
        z.object({
          id: z.string().nonempty({ message: t('errors.isRequired') }),
          name: z.string().nonempty({ message: t('errors.isRequired') }),
          cost: z.number().optional(),
          nutrition: z
            .object({
              nutrients: z
                .array(
                  z.object({
                    name: z.string().nonempty(),
                    amount: z.number().min(0)
                  })
                )
                .optional()
            })
            .optional(),
          alternateUnits: z
            .array(
              z.object({
                unit: z.string(),
                amount: z.number(),
                gramWeight: z.number()
              })
            )
            .optional(),
          quantity: z.coerce
            .number()
            .min(1, { message: 'Quantity must be higher than 1' }),
          unit: z.string().nonempty({ message: t('errors.isRequired') })
        })
      )
      .optional(),
    instructions: z
      .array(
        z.object({
          content: z.string().nonempty({ message: t('errors.isRequired') })
        })
      )
      .optional()
  });

export const createMealSchema = z
  .object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    preparationMinutes: z.number().optional(),
    cookingMinutes: z.number().optional(),
    pricePerServing: z.number().optional(),
    servings: z.number().optional(),
    vegetarian: z.boolean().optional(),
    vegan: z.boolean().optional(),
    glutenFree: z.boolean().optional(),
    dairyFree: z.boolean().optional(),
    veryHealthy: z.boolean().optional(),
    cheap: z.boolean().optional(),
    veryPopular: z.boolean().optional(),
    sustainable: z.boolean().optional(),
    nutrition: z
      .object({
        nutrients: z
          .array(
            z.object({
              name: z.string(),
              amount: z.number()
            })
          )
          .optional()
      })
      .optional(),
    ingredients: z
      .array(
        z.object({
          id: z.string().nonempty(),
          name: z.string().nonempty(),
          cost: z.number().optional(),
          nutrition: z
            .object({
              nutrients: z
                .array(
                  z.object({
                    name: z.string().nonempty(),
                    amount: z.number().min(0)
                  })
                )
                .optional()
            })
            .optional(),
          quantity: z.number().min(1),
          unit: z.string().nonempty()
        })
      )
      .optional(),
    instructions: z
      .array(
        z.object({
          content: z.string().nonempty()
        })
      )
      .optional()
  })
  .required();
