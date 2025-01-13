'use client';

import { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Minus, Plus, X } from 'lucide-react';
import FormInput from '@/components/inputs/formInput';
import FormError from '@/components/errors/formError/formError';
import FormSelect from '@/components/inputs/formSelect';

const CreateMealForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultIngredient = {
    ingredient: { name: '', id: 0, possibleUnits: [] },
    quantity: 0,
    unit: ''
  };

  const defaultInstruction = {
    content: ''
  };

  const t = useTranslations('Common');

  const schema = yup
    .object({
      name: yup.string().required(t('errors.isRequired')),
      description: yup.string().required(t('errors.isRequired')),
      ingredients: yup.array().of(
        yup.object({
          ingredient: yup
            .object({
              name: yup.string().required(t('errors.isRequired')),
              id: yup.number().required(t('errors.isRequired')),
              possibleUnits: yup
                .array()
                .of(yup.string().required())
                .required(t('errors.isRequired'))
            })
            .required(t('errors.isRequired')),
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
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
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
    // router.push('/dashboard');
    reset();
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onChange = async (event: ChangeEvent<HTMLInputElement>, id: string) => {
    /* if (event.target.value.length > 3) {
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
    } */
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary text-white"
        onClick={onOpen}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Meal
      </button>
      {isOpen && (
        <div className="z-20 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <FormInput
                    id="name"
                    type="text"
                    {...register('name', {
                      required: true
                    })}
                  >
                    Recipe Name
                  </FormInput>
                </div>

                <div>
                  <FormInput
                    id="description"
                    type="textarea"
                    {...register('description', {
                      required: true
                    })}
                  >
                    Description
                  </FormInput>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-lg font-medium text-gray-700">
                      Ingredients
                    </label>
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
                      <div
                        key={ingredient.id}
                        className="flex gap-2 items-center"
                      >
                        <FormInput
                          id={`ingredients.${index}.ingredient.name`}
                          error={errors.ingredients?.[index]?.ingredient?.name}
                          {...register(`ingredients.${index}.ingredient.name`, {
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
                        <FormInput
                          type="number"
                          id={`ingredients.${index}.quantity`}
                          {...register(`ingredients.${index}.quantity`, {
                            required: true
                          })}
                          placeholder="Amount"
                        >
                          Qty
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
                        >
                          Unit
                        </FormSelect>
                        <button
                          type="button"
                          onClick={() => ingredientRemove(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full mt-8"
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
                    <label className="block text-lg font-medium text-gray-700">
                      Instructions
                    </label>
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
                      <div
                        key={instruction.id}
                        className="flex gap-2 items-center"
                      >
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
          </div>
        </div>
      )}
    </>
  );
};

export default CreateMealForm;
