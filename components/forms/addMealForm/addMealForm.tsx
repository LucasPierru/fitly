'use client';

import { useState, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import FormInput from '@/components/inputs/formInput';
import FormTextArea from '@/components/inputs/formTextArea';
import { ingredientSearchAutocomplete } from '@/actions/food';
import type { FoodInformation } from '@/types/foods';

const AddMealForm = () => {
  const defaultValues = {
    ingredients: [{ ingredient: '', quantity: 0 }]
  };
  const t = useTranslations('Common');
  const [ingredients, setIngredients] = useState<FoodInformation[]>([]);

  const schema = yup.object({
    title: yup.string().required(t('errors.isRequired')),
    description: yup.string().required(t('errors.isRequired')),
    ingredients: yup.array().of(
      yup.object({
        ingredient: yup.string().required(t('errors.isRequired')),
        quantity: yup.number().required(t('errors.isRequired'))
      })
    )
  });

  type Inputs = yup.InferType<typeof schema>;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(schema), defaultValues });

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'ingredients' // unique name for your Field Array
  });

  console.log({ errors, fields });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log({ data });
    reset();
  };

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 3) {
      const data = await ingredientSearchAutocomplete(event.target.value);
      if (data) {
        setIngredients(data);
      }
    } else if (event.target.value.length <= 3 && ingredients.length !== 0) {
      setIngredients([]);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 min-w-full mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-4">
          <FormInput
            id={`ingredients.${index}.ingredient`}
            error={errors.ingredients?.[0]?.ingredient}
            {...register(`ingredients.${index}.ingredient`, {
              required: true
            })}
            type="text"
            onChange={onChange}
          >
            Ingredient
          </FormInput>
          <FormInput
            id={`ingredients.${index}.quantity`}
            error={errors.ingredients?.[0]?.quantity}
            {...register(`ingredients.${index}.quantity`, {
              required: true
            })}
            type="text"
          >
            Quantity
          </FormInput>
          {(index > 0 || fields.length > 1) && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                remove(index);
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
          append({ ingredient: '', quantity: 0 });
        }}
      >
        <PlusIcon className="w-6 h-6" />
        Add ingredient
      </button>
      <button type="submit">Add meal</button>
    </form>
  );
};

export default AddMealForm;
