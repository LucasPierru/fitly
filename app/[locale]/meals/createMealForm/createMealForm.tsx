'use client';

import { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Minus, Plus, X } from 'lucide-react';
import FormInput from '@/components/inputs/formInput';
import FormSelect from '@/components/inputs/formSelect';
import {
  getIngredientInformations,
  getIngredientsAutocomplete
} from '@/requests/food';
import { calculateMacros, capitalizeWord } from '@/utils/utils';
import { FoodInformation, FoodInformationDetails } from '@/types/foods';
import Modal from '@/components/modal/modal';
import { createMeal } from '@/requests/meal';

const CreateMealForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredients, setIngredients] = useState<
    Record<string, FoodInformation[]>
  >({});

  const defaultIngredient = {
    id: 0,
    name: '',
    quantity: 0,
    unit: '',
    nutrition: {
      nutrients: []
    }
  };

  const defaultInstruction = {
    content: ''
  };

  const t = useTranslations('Common');

  const schema = yup
    .object({
      name: yup.string().required(t('errors.isRequired')),
      description: yup.string().required(t('errors.isRequired')),
      preparationMinutes: yup.number(),
      cookingMinutes: yup.number(),
      pricePerServing: yup.number(),
      servings: yup.number(),
      vegetarian: yup.boolean(),
      vegan: yup.boolean(),
      glutenFree: yup.boolean(),
      dairyFree: yup.boolean(),
      veryHealthy: yup.boolean(),
      cheap: yup.boolean(),
      veryPopular: yup.boolean(),
      sustainable: yup.boolean(),
      lowFodmap: yup.boolean(),
      nutrition: yup.object({
        nutrients: yup.array().of(
          yup.object({
            name: yup.string(),
            amount: yup.number()
          })
        )
      }),
      ingredients: yup.array().of(
        yup.object({
          id: yup.number().required(t('errors.isRequired')),
          name: yup.string().required(t('errors.isRequired')),
          cost: yup.number(),
          nutrition: yup.object({
            nutrients: yup.array().of(
              yup.object({
                name: yup.string().required(),
                amount: yup.number().required()
              })
            )
          }),
          quantity: yup
            .number()
            .required(t('errors.isRequired'))
            .min(1, 'Quantity must be higher than 1'),
          unit: yup.string().required(t('errors.isRequired'))
        })
      ),
      instructions: yup
        .array()
        .of(
          yup.object({ content: yup.string().required(t('errors.isRequired')) })
        )
    })
    .required();

  type Inputs = yup.InferType<typeof schema>;

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      lowFodmap: false,
      ingredients: [],
      instructions: []
    }
  });

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove
  } = useFieldArray({
    control,
    name: 'ingredients'
  });

  const {
    fields: instructionFields,
    append: instructionAppend,
    remove: instructionRemove
  } = useFieldArray({
    control,
    name: 'instructions'
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let ingredientsInformation: FoodInformationDetails[] = [];
    if (data.ingredients) {
      ingredientsInformation = await Promise.all(
        data.ingredients?.map(async (ingredient) => {
          const info = await getIngredientInformations(
            ingredient.id,
            ingredient.quantity,
            ingredient.unit
          );
          return info;
        })
      );
    }

    const nutrition = calculateMacros(
      ingredientsInformation!
        .map((ingredient) => ingredient.nutrition.nutrients!.flat())
        .flat()
    );

    const pricePerServing = data.servings
      ? Math.round(
          ingredientsInformation.reduce(
            (acc, ingredient) => acc + ingredient.estimatedCost.value,
            0
          ) / data.servings
        ) / 100
      : 0;
    await createMeal({ ...data, nutrition, pricePerServing });
    // router.push('/dashboard');
    /* reset(); */
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onChange = async (event: ChangeEvent<HTMLInputElement>, id: string) => {
    if (event.target.value.length > 3) {
      const data = await getIngredientsAutocomplete(event.target.value);
      if (data) {
        setIngredients((currentState) => ({ ...currentState, [id]: data }));
      }
    } else if (
      event.target.value.length <= 3 &&
      ingredients[id] &&
      ingredients[id].length !== 0
    ) {
      setIngredients({});
    }
  };

  const onSelectIngredient = async (
    index: number,
    ingredient: FoodInformation
  ) => {
    const { id, name, possibleUnits } = ingredient;

    setValue(`ingredients.${index}.id`, id);
    setValue(`ingredients.${index}.name`, capitalizeWord(name));

    setIngredients({});
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary text-white"
        onClick={onOpen}
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Meal
      </button>
      <Modal isOpen={isOpen}>
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Create New Recipe</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />{' '}
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormInput
              id="name"
              type="text"
              {...register('name', {
                required: true
              })}
              error={errors.name}
            >
              Recipe Name
            </FormInput>
            <FormInput
              id="description"
              type="textarea"
              {...register('description', {
                required: true
              })}
              error={errors.description}
            >
              Description
            </FormInput>
            <div className="flex gap-4">
              <FormInput
                id="preparationMinutes"
                type="number"
                {...register('preparationMinutes', {
                  required: true
                })}
                error={errors.preparationMinutes}
              >
                Preparation time (min)
              </FormInput>
              <FormInput
                id="cookingMinutes"
                type="number"
                {...register('cookingMinutes', {
                  required: true
                })}
                error={errors.cookingMinutes}
              >
                Cooking time (min)
              </FormInput>
              <FormInput
                id="servings"
                type="number"
                {...register('servings', {
                  required: true
                })}
                error={errors.servings}
              >
                Servings
              </FormInput>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="block text-lg font-medium text-gray-700">
                  Ingredients
                </span>
                <button
                  type="button"
                  onClick={() => ingredientAppend(defaultIngredient)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-md font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Ingredient
                </button>
              </div>
              <div className="space-y-2">
                {ingredientFields.map((ingredient, index) => (
                  <div key={ingredient.id} className="flex gap-2">
                    <div className="relative flex-1">
                      <FormInput
                        id={`ingredients.${index}.ingredient.name`}
                        error={errors.ingredients?.[index]?.name}
                        {...register(`ingredients.${index}.name`, {
                          required: true
                        })}
                        type="text"
                        onChange={(event) => {
                          onChange(event, ingredient.id);
                        }}
                        autoComplete="off"
                        placeholder="E.g. Chicken breast"
                      >
                        Name
                      </FormInput>
                      {ingredients[ingredient.id] &&
                        ingredients[ingredient.id].length > 0 && (
                          <div className="z-50 absolute top-16 mt-2 w-full gap-2 px-2 py-2 flex flex-col bg-secondary rounded-b-xl border border-secondary group-focus-within:border-b-white group-focus-within:border-x-white group-focus-within:text-red">
                            {ingredients[ingredient.id].map((ingr) => {
                              return (
                                <button
                                  key={ingr.id}
                                  type="button"
                                  className="btn btn-secondary btn-sm justify-start"
                                  onClick={() => {
                                    onSelectIngredient(index, ingr);
                                  }}
                                >
                                  {capitalizeWord(ingr.name)}
                                </button>
                              );
                            })}
                          </div>
                        )}
                    </div>
                    <FormInput
                      type="number"
                      id={`ingredients.${index}.quantity`}
                      {...register(`ingredients.${index}.quantity`, {
                        required: true
                      })}
                      placeholder="Amount"
                      className="!w-24"
                    >
                      Amount
                    </FormInput>
                    <FormSelect
                      id={`ingredients.${index}.unit`}
                      {...register(`ingredients.${index}.unit`, {
                        required: true
                      })}
                      options={[
                        { name: 'g', value: 'g' },
                        { name: 'ml', value: 'ml' },
                        { name: 'pcs', value: 'pcs' },
                        { name: 'tbsp', value: 'tbsp' },
                        { name: 'tsp', value: 'tsp' }
                      ]}
                      className="!w-24"
                    >
                      Unit
                    </FormSelect>
                    <button
                      type="button"
                      onClick={() => ingredientRemove(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full mt-8 grow-0"
                    >
                      {' '}
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="block text-lg font-medium text-gray-700">
                  Instructions
                </span>
                <button
                  type="button"
                  onClick={() => instructionAppend(defaultInstruction)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-md font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Step
                </button>
              </div>
              <div className="space-y-2">
                {instructionFields.map((instruction, index) => (
                  <div key={instruction.id} className="flex gap-2 items-center">
                    <span className="mt-2 text-gray-500">{index + 1}.</span>
                    <FormInput
                      id={`instuctions.${index}.content`}
                      error={errors.instructions?.[index]?.content}
                      {...register(`instructions.${index}.content`, {
                        required: true
                      })}
                      type="textarea"
                      autoComplete="off"
                      placeholder="E.g. Salt and pepper the chicken"
                    />
                    <button
                      type="button"
                      onClick={() => instructionRemove(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      {' '}
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-md font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Recipe
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateMealForm;
