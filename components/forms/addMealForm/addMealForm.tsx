'use client';

import { useState, ChangeEvent, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import FormInput from '@/components/inputs/formInput';
import FormTextArea from '@/components/inputs/formTextArea';
import type { FoodInformation } from '@/types/foods';
import { capitalizeWord, getMealTypeList } from '@/utils/utils';
import { getIngredientsAutocomplete } from '@/requests/food';
import useOutsideClick from '@/hooks/useOutsideClick';
import { createRecipeWithTransaction } from '@/actions/ingredients';
import ImagesModal from '@/components/imagesModal/imagesModal';

const AddMealForm = () => {
  const defaultIngredient = {
    ingredient: { name: '', id: 0, possibleUnits: [] },
    quantity: 0,
    unit: ''
  };

  const defaultInstruction = {
    content: ''
  };

  const defaultValues = {
    title: '',
    description: '',
    image: undefined,
    mealTypes: [],
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    servings: 0,
    preparationTime: 0,
    instructions: [],
    ingredients: [defaultIngredient]
  };

  const mealTypes = getMealTypeList();
  const filters: ('vegetarian' | 'vegan' | 'glutenFree' | 'dairyFree')[] = [
    'vegetarian',
    'vegan',
    'glutenFree',
    'dairyFree'
  ];

  const t = useTranslations('Common');
  const [ingredients, setIngredients] = useState<
    Record<string, FoodInformation[]>
  >({});
  const ref = useRef<HTMLDivElement>(null);

  const schema = yup.object({
    title: yup.string().required(t('errors.isRequired')),
    description: yup.string().required(t('errors.isRequired')),
    picture: yup.string().required(t('errors.isRequired')),
    instructions: yup.array().of(
      yup.object({
        content: yup.string().required(t('errors.isRequired'))
      })
    ),
    mealTypes: yup
      .array()
      .of(yup.string().oneOf(mealTypes).required(t('errors.isRequired')))
      .required(t('errors.isRequired')),
    vegetarian: yup.bool().required(t('errors.isRequired')),
    vegan: yup.bool().required(t('errors.isRequired')),
    glutenFree: yup.bool().required(t('errors.isRequired')),
    dairyFree: yup.bool().required(t('errors.isRequired')),
    servings: yup
      .number()
      .required(t('errors.isRequired'))
      .min(1, 'Quantity must be higher than 1'),
    preparationTime: yup
      .number()
      .required(t('errors.isRequired'))
      .min(1, 'Quantity must be higher than 1'),
    ingredients: yup
      .array()
      .of(
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
      )
      .required(t('errors.isRequired'))
  });

  type Inputs = yup.InferType<typeof schema>;

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(schema), defaultValues });

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'ingredients' // unique name for your Field Array
  });

  const {
    fields: instructionFields,
    append: instructionAppend,
    remove: instructionRemove
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'instructions' // unique name for your Field Array
  } as never);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createRecipeWithTransaction(data);
    reset();
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

  const onSelectIngredient = (index: number, ingredient: FoodInformation) => {
    const { id, name, possibleUnits } = ingredient;
    setValue(`ingredients.${index}.ingredient`, {
      id,
      name: capitalizeWord(name),
      possibleUnits
    });
    setIngredients({});
  };

  const clickOutsideHandler = () => {
    setIngredients({});
  };

  useOutsideClick(ref, clickOutsideHandler);

  return (
    <form
      className="flex flex-col min-w-full mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ImagesModal
        query={watch('title')}
        onSelect={(image: string) => {
          setValue('picture', image);
        }}
      />
      <div>
        <FormInput
          id="title"
          error={errors.title}
          {...register('title', {
            required: true
          })}
          type="text"
          placeholder="E.g. Chicken Salad"
        >
          Name
        </FormInput>
        <FormTextArea
          id="description"
          error={errors.description}
          {...register('description', {
            required: true
          })}
          placeholder="E.g. Lettuce with chicken breast and caesar dressing"
        >
          Description
        </FormTextArea>
      </div>

      <div className="flex gap-4 flex-wrap mb-8">
        {mealTypes.map((type) => {
          return (
            <button
              key={type}
              type="button"
              className={`btn ${watch('mealTypes').includes(type) ? 'btn-primary bg-primary text-white' : 'btn-secondary bg-secondary'} rounded-full py-2 px-4 text-base`}
              onClick={() => {
                const currentMealTypes = watch('mealTypes');
                if (currentMealTypes.includes(type)) {
                  const index = currentMealTypes.indexOf(type);
                  currentMealTypes.splice(index, 1);
                  setValue('mealTypes', currentMealTypes);
                } else {
                  currentMealTypes.push(type);
                  setValue('mealTypes', currentMealTypes);
                }
              }}
            >
              {capitalizeWord(type)}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4 mb-8">
        {filters.map((filter) => {
          const filterValue = watch(filter);
          return (
            <button
              key={filter}
              type="button"
              className={`btn ${filterValue ? 'btn-primary bg-primary text-white' : 'btn-secondary bg-secondary'} rounded-full py-2 px-4 text-base`}
              onClick={() => {
                setValue(filter, !filterValue);
              }}
            >
              {capitalizeWord(filter.split(/(?=[A-Z])/)?.join(' '))}
            </button>
          );
        })}
      </div>
      <div className="flex gap-4">
        <FormInput
          id="servings"
          error={errors.servings}
          {...register('servings', {
            required: true
          })}
          type="text"
          placeholder="E.g. 1"
        >
          Servings
        </FormInput>
        <FormInput
          id="preparationTime"
          error={errors.preparationTime}
          {...register('preparationTime', {
            required: true
          })}
          type="text"
          placeholder="E.g. 45"
        >
          Preparation time (in minutes)
        </FormInput>
      </div>
      <div className="mb-8">
        <span className="block text-xl mb-2">Instructions</span>
        {instructionFields.map((field, index) => {
          return (
            <div key={field.id} className="flex items-center gap-4">
              <FormInput
                id={`instructions.${index}.content`}
                error={errors.instructions?.[index]?.content}
                {...register(`instructions.${index}.content`, {
                  required: true
                })}
                type="text"
                placeholder="E.g. Cut the chicken into pieces"
              >
                Instruction {index + 1}
              </FormInput>
              {instructionFields.length > 0 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    instructionRemove(index);
                  }}
                >
                  <MinusIcon className="w-6 h-6" />
                  Remove
                </button>
              )}
            </div>
          );
        })}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            instructionAppend(defaultInstruction);
          }}
        >
          <PlusIcon className="w-6 h-6" />
          Add Instruction
        </button>
      </div>
      <div>
        <span className="block text-xl mb-2">Ingredients</span>
        {ingredientFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4">
            <div className="relative w-full group" ref={ref}>
              <FormInput
                id={`ingredients.${index}.ingredient.name`}
                error={errors.ingredients?.[index]?.ingredient?.name}
                {...register(`ingredients.${index}.ingredient.name`, {
                  required: true
                })}
                type="text"
                onChange={(event) => {
                  onChange(event, field.id);
                }}
                autoComplete="off"
                placeholder="E.g. Chicken breast"
              >
                Ingredient
              </FormInput>
              {ingredients[field.id] && ingredients[field.id].length > 0 && (
                <div className="absolute top-16 mt-2 w-full gap-2 px-2 py-2 flex flex-col bg-secondary rounded-b-xl border border-secondary group-focus-within:border-b-white group-focus-within:border-x-white group-focus-within:text-red z-20">
                  {ingredients[field.id].map((ingredient) => {
                    return (
                      <button
                        key={ingredient.id}
                        type="button"
                        className="btn btn-secondary btn-sm justify-start"
                        onClick={() => {
                          onSelectIngredient(index, ingredient);
                        }}
                      >
                        {capitalizeWord(ingredient.name)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <FormInput
              id={`ingredients.${index}.quantity`}
              error={errors.ingredients?.[index]?.quantity}
              {...register(`ingredients.${index}.quantity`, {
                required: true
              })}
              type="text"
            >
              Quantity
            </FormInput>
            {watch(`ingredients.${index}.ingredient.possibleUnits`).length >
              0 && (
              <select
                className="select bg-secondary text-white placeholder:text-white w-full focus:outline-0"
                {...register(`ingredients.${index}.unit`, {
                  required: true
                })}
              >
                <option hidden selected disabled value="">
                  Select an option
                </option>
                {watch(`ingredients.${index}.ingredient.possibleUnits`).map(
                  (unit) => {
                    return (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    );
                  }
                )}
              </select>
            )}
            {(index > 0 || ingredientFields.length > 1) && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  ingredientRemove(index);
                }}
              >
                <MinusIcon className="w-6 h-6" />
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            ingredientAppend(defaultIngredient);
          }}
        >
          <PlusIcon className="w-6 h-6" />
          Add ingredient
        </button>
      </div>
      <button type="submit">Add meal</button>
    </form>
  );
};

export default AddMealForm;
