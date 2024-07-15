'use client';

import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormError from '@/components/errors/formError/formError';
import { signIn } from '@/actions/auth';

const SignUpForm = () => {
  const t = useTranslations('Common');

  const schema = yup
    .object({
      email: yup
        .string()
        .required(t('errors.isRequired'))
        .email(t('errors.invalidEmail')),
      password: yup.string().required(t('errors.isRequired'))
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
    await signIn(data);
    reset();
  };

  const inputs: { id: keyof Inputs; label: string; type: string }[] = [
    {
      id: 'email',
      label: 'Courriel',
      type: 'text'
    },
    {
      id: 'password',
      label: 'Mot de passe',
      type: 'password'
    }
  ];

  return (
    <form
      className="flex flex-col gap-4 min-w-full mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-2xl font-semibold">Log into your account</span>
      <div className="flex flex-col grow rounded-lg gap-1 items-center">
        {inputs.map((input) => (
          <label key={input.id} htmlFor={input.id} className="w-full">
            {input.label}
            <input
              id={input.id}
              type={input.type}
              className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0 mt-2"
              {...register(input.id, {
                required: true
              })}
            />
            <FormError error={errors[input.id]} />
          </label>
        ))}
        <button type="submit" className="btn btn-primary max-w-xs w-full">
          Log In
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
