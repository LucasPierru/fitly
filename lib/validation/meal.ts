import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const formMealSchema = (t: (arg: string) => string) =>
  z.object({
    title: z.string().nonempty({ message: t('errors.isRequired') }),
    image: z
      .any({ message: t('errors.imageIsRequired') })
      .refine(
        (file) => file[0]?.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      ),
    description: z.string().nonempty({ message: t('errors.isRequired') }),
    preparationMinutes: z.coerce
      .number()
      .min(1, { message: t('errors.isNotPositive') }),
    cookingMinutes: z.coerce
      .number()
      .min(1, { message: t('errors.isNotPositive') }),
    servings: z.coerce.number().min(1, { message: t('errors.isNotPositive') }),
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
        calories: z.number().optional(),
        protein: z.number().optional(),
        fat: z.number().optional(),
        carbs: z.number().optional()
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
            .min(1, { message: t('errors.isNotPositive') }),
          unit: z.string().nonempty({ message: t('errors.isRequired') })
        })
      )
      .min(1, { message: t('errors.atLeastOneIngredient') }),
    instructions: z
      .array(
        z.object({
          name: z.string().nonempty({ message: t('errors.isRequired') }),
          step: z.number().min(1)
        })
      )
      .optional(),
    isPublic: z.boolean().optional(),
    isApproved: z.boolean().optional()
  });

export const createMealSchema = z.object({
  title: z.string().nonempty(),
  image: z.object({ name: z.string(), data: z.string(), type: z.string() }),
  description: z.string().nonempty(),
  preparationMinutes: z.number().min(0).optional(),
  cookingMinutes: z.number().min(0).optional(),
  pricePerServing: z.number().min(0).optional(),
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
      calories: z.number().optional(),
      protein: z.number().optional(),
      fat: z.number().optional(),
      carbs: z.number().optional()
    })
    .optional(),
  ingredients: z
    .array(
      z.object({
        ingredient: z.string().nonempty(),
        quantity: z.number().min(1),
        unit: z.string().nonempty()
      })
    )
    .optional(),
  instructions: z
    .array(
      z.object({
        name: z.string().nonempty(),
        step: z.number().min(1)
      })
    )
    .optional(),
  isPublic: z.boolean().optional(),
  isApproved: z.boolean().optional()
});
