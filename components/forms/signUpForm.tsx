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

  const inputs: { id: keyof Inputs; label: string }[] = [
    {
      id: 'lastName',
      label: 'Nom'
    },
    {
      id: 'firstName',
      label: 'Prénom'
    },
    {
      id: 'email',
      label: 'Courriel'
    },
    {
      id: 'password',
      label: 'Mot de passe'
    },
    {
      id: 'confirmPassword',
      label: 'Confirmer mot de passe'
    }
  ];

  return (
    <form
      className="flex flex-col lg:flex-row gap-4 min-w-full mt-4 lg:mt-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col grow rounded-lg gap-1 max-w-5xl">
        {inputs.map((input) => (
          <label htmlFor={input.id}>
            {input.label}
            <input
              id={input.id}
              className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0 mt-2"
              {...register(input.id, {
                required: true
              })}
            />
            <FormError error={errors.lastName} />
          </label>
        ))}
        <button type="submit" className="btn btn-primary grow max-w-xs">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
