'use client';

import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormError from '@/components/errors/formError/formError';
import { signUp } from '@/app/actionts';

const SignUpForm = () => {
  const t = useTranslations('Common');

  const schema = yup
    .object({
      firstName: yup.string().required(t('errors.isRequired')),
      lastName: yup.string().required(t('errors.isRequired')),
      email: yup
        .string()
        .required(t('errors.isRequired'))
        .email(t('errors.invalidEmail')),
      password: yup.string().required(t('errors.isRequired')),
      confirmPassword: yup.string().required(t('errors.isRequired'))
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
    await signUp(data);
    reset();
  };

  return (
    <div className="min-h-[var(--page-size)] flex flex-col items-center justify-center gap-4 px-4">
      <form
        className="flex flex-col lg:flex-row gap-4 items-center justify-center min-w-full mt-4 lg:mt-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col grow rounded-lg gap-1 p-4 max-w-5xl">
          <input
            className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0"
            placeholder="Nom"
            {...register('lastName', {
              required: true
            })}
          />
          <FormError error={errors.lastName} />
          <input
            className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0"
            placeholder="Prénom"
            {...register('firstName', {
              required: true
            })}
          />
          <FormError error={errors.firstName} />
          <input
            className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0"
            placeholder="Courriel"
            {...register('email', {
              required: true
            })}
          />
          <FormError error={errors.email} />
          <input
            className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0"
            placeholder="Mot de passe"
            {...register('password', {
              required: true
            })}
          />
          <FormError error={errors.password} />
          <input
            className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0"
            placeholder="Confirmer mot de passe"
            {...register('confirmPassword', {
              required: true
            })}
          />
          <FormError error={errors.confirmPassword} />
          <button type="submit" className="btn btn-primary grow max-w-xs">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
