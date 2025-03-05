'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormError from '@/components/errors/formError/formError';
import { HowActive, Sex, User } from '@/types-old/users';
import Card from '@/components/cards/card';
import { updateProfile } from '@/requests/profile';

export function UserSettings({ profile }: { profile: User }) {
  const t = useTranslations('Common');
  const router = useRouter();
  const schema = yup
    .object({
      height: yup.number().min(0, t('errors.isNotNumber')),
      weight: yup.number().min(0, t('errors.isNotNumber')),
      birthday: yup.string(),
      sex: yup.string<Sex>().oneOf(['male', 'female']),
      howActive: yup
        .string<HowActive>()
        .oneOf(['sedentary', 'light', 'moderate', 'active', 'very_active'])
    })
    .required();

  type Inputs = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: profile
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await updateProfile(data);
    router.refresh();
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="height"
              className="block text-md font-medium textforeground-secondary"
            >
              Height (cm)
              <input
                id="height"
                type="number"
                className="mt-1 block bg-secondary w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register('height', {
                  required: true
                })}
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="weight"
              className="block text-md font-medium textforeground-secondary"
            >
              Weight (kg)
              <input
                id="weight"
                type="number"
                className="mt-1 block bg-secondary w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register('weight', {
                  required: true
                })}
              />
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="birthday"
            className="block text-md font-medium textforeground-secondary"
          >
            Birthday
            <input
              id="birthday"
              type="date"
              {...register('birthday', {
                required: true
              })}
              defaultValue={new Date(profile.birthday!).toLocaleDateString()}
              className="mt-1 block bg-secondary w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
        </div>

        <div>
          <label
            htmlFor="sex"
            className="block text-md font-medium textforeground-secondary"
          >
            Sex
            <select
              id="sex"
              className="mt-1 block bg-secondary w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register('sex', {
                required: true
              })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>

        <div>
          <label
            htmlFor="howActive"
            className="block text-md font-medium textforeground-secondary"
          >
            Activity Level
            <select
              id="howActive"
              className="mt-1 block bg-secondary w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              {...register('howActive', {
                required: true
              })}
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light Exercise</option>
              <option value="moderate">Moderate Exercise</option>
              <option value="active">Active</option>
              <option value="very_active">Very Active</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </form>
    </Card>
  );
}
