'use client';

import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormError from '@/components/errors/formError/formError';
import { Database } from '@/types/supabase';
import FormInput from '@/components/inputs/formInput';
import { addMealPlan } from '@/actions/mealPlans';
import { RecipeInformation } from '@/types/recipes';

type AddToMealPlanFormProps = {
  mealPlans:
    | {
        id: string;
        name: string;
      }[]
    | null;
  recipe: RecipeInformation;
};

const AddToMealPlanForm = ({ mealPlans, recipe }: AddToMealPlanFormProps) => {
  const t = useTranslations('Common');
  const schema = yup
    .object()
    .shape({
      plan: yup.object().shape(
        {
          planId: yup.string().when('newMealPlanName', {
            is: (value: string) => mealPlans && mealPlans.length > 0,
            then: (scheme) => scheme.required(t('errors.isRequired')),
            otherwise: (scheme) => scheme
          }),
          newMealPlanName: yup.string().when('planId', {
            is: (value: string) => !mealPlans || mealPlans.length === 0,
            then: (scheme) => scheme.required(t('errors.isRequired')),
            otherwise: (scheme) => scheme
          })
        },
        [['newMealPlanName', 'planId']]
      ),
      mealTime: yup
        .string<Database['public']['Enums']['meal_time']>()
        .required(t('errors.isRequired')),
      mealDay: yup
        .string<Database['public']['Enums']['day']>()
        .required(t('errors.isRequired'))
    })
    .required();
  type Inputs = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await addMealPlan({ ...data, recipe });
    reset();
  };

  return (
    <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit(onSubmit)}>
      <span className="block text-xl font-semibold col-span-full">
        Add this recipe to one of your plans
      </span>
      <div>
        {mealPlans && mealPlans.length > 0 && (
          <label htmlFor="planId">
            Plans
            <select
              {...register('plan.planId', {
                required: true
              })}
              className="select bg-secondary text-white placeholder:text-white w-full focus:outline-0 text-base font-light mt-2"
            >
              {mealPlans?.map((mealPlan) => {
                return (
                  <option key={mealPlan.id} value={mealPlan.id}>
                    {mealPlan.name}
                  </option>
                );
              })}
            </select>
            <FormError error={errors.plan?.planId} />
          </label>
        )}
        {(!mealPlans || mealPlans.length === 0) && (
          <FormInput
            id="newMealPlanName"
            {...register('plan.newMealPlanName', {
              required: true
            })}
            error={errors.plan?.newMealPlanName}
            type="text"
          >
            Plan Name
          </FormInput>
        )}
      </div>
      <div>
        <label htmlFor="mealTime">
          Meal Time
          <select
            {...register('mealTime', {
              required: true
            })}
            className="select bg-secondary text-white placeholder:text-white w-full focus:outline-0 text-base font-light mt-2"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          <FormError error={errors.mealTime} />
        </label>
      </div>
      <div>
        <label htmlFor="mealDay">
          Meal Day
          <select
            {...register('mealDay', {
              required: true
            })}
            className="select bg-secondary text-white placeholder:text-white w-full focus:outline-0 text-base font-light mt-2"
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
          <FormError error={errors.mealDay} />
        </label>
      </div>
      <button
        className="btn btn-primary text-foreground col-span-full"
        type="submit"
      >
        Add To My Meals
      </button>
    </form>
  );
};

export default AddToMealPlanForm;
