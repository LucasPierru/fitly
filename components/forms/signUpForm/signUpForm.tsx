'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormError from '@/components/errors/formError/formError';
import { signUp } from '@/actions/auth';
import RadioButton from '../radioButton/radioButton';
import { HowActive, Sex, Goal } from '@/types/users';

const SignUpForm = () => {
  const t = useTranslations('Common');
  const [step, setStep] = useState(0);
  const [isKg, setIsKg] = useState(true);
  const [isCm, setIsCm] = useState(true);
  const [trueBmr, setTrueBmr] = useState(0);
  const stepCount = 3;
  const activityMultiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    super: 1.9
  };

  const convertLbsToKgs = (lbs: number) => {
    return lbs * 0.45;
  };

  const convertFeetAndInchesToCms = (feet: number, inches: number) => {
    return feet * 30.5 + inches * 2.54;
  };

  const calculateBmr = (
    weight: number,
    height: number | { ft: number; in: number },
    age: number,
    sex: 'm' | 'f'
  ) => {
    const kgWeight = isKg ? weight : convertLbsToKgs(weight);
    const cmHeight =
      !isCm && typeof height !== 'number'
        ? convertFeetAndInchesToCms(height.ft, height.in)
        : (height as number);
    if (sex === 'm') {
      return 10 * kgWeight + 6.25 * cmHeight - 5 * age + 5;
    }
    return 10 * kgWeight + 6.25 * cmHeight - 5 * age - 161;
  };

  const schema = yup
    .object({
      firstName: yup.string().required(t('errors.isRequired')),
      lastName: yup.string().required(t('errors.isRequired')),
      email: yup
        .string()
        .required(t('errors.isRequired'))
        .email(t('errors.invalidEmail')),
      password: yup.string().required(t('errors.isRequired')),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required(t('errors.isRequired')),
      height: !isCm
        ? yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .notRequired()
        : yup.number().required(t('errors.isRequired')).positive(),
      heightFt: isCm
        ? yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .notRequired()
        : yup.number().required(t('errors.isRequired')).positive(),
      heightIn: isCm
        ? yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .notRequired()
        : yup.number().required(t('errors.isRequired')).positive(),
      weight: yup.number().required(t('errors.isRequired')).positive(),
      sex: yup
        .mixed<Sex>()
        .oneOf(['m', 'f'] as const)
        .defined()
        .required(t('errors.isRequired')),
      age: yup.number().required(t('errors.isRequired')).positive(),
      howActive: yup.string<HowActive>().required(t('errors.isRequired')),
      goal: yup.string<Goal>().required(t('errors.isRequired'))
    })
    .required();

  type Inputs = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    getValues,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const kgWeight = isKg ? data.weight : convertLbsToKgs(data.weight);
    const cmHeight =
      !isCm &&
      typeof data.heightFt === 'number' &&
      typeof data.heightIn === 'number'
        ? convertFeetAndInchesToCms(data.heightFt, data.heightIn)
        : (data.height as number);
    await signUp({ ...data, height: cmHeight, weight: kgWeight });
    reset();
  };

  const personalInputs: { id: keyof Inputs; label: string; type: string }[] = [
    {
      id: 'lastName',
      label: 'Nom',
      type: 'text'
    },
    {
      id: 'firstName',
      label: 'Prénom',
      type: 'text'
    },
    {
      id: 'email',
      label: 'Courriel',
      type: 'text'
    },
    {
      id: 'password',
      label: 'Mot de passe',
      type: 'password'
    },
    {
      id: 'confirmPassword',
      label: 'Confirmer mot de passe',
      type: 'password'
    }
  ];

  const inputs: { id: keyof Inputs; label: string }[] = [
    {
      id: 'height',
      label: 'Taille'
    },
    {
      id: 'weight',
      label: 'Poids'
    },
    {
      id: 'sex',
      label: 'Sex'
    },
    {
      id: 'age',
      label: 'Âge'
    },
    {
      id: 'howActive',
      label: "Niveau d'activité"
    }
  ];

  const steps = [
    {
      id: 'Step 1',
      name: 'Personal Information',
      fields: personalInputs.map((input) => input.id)
    },
    {
      id: 'Step 2',
      name: 'Fitness Information',
      fields: inputs.map((input) => input.id)
    },
    { id: 'Step 3', name: 'Complete', fields: ['goal'] }
  ];

  const goToNextStep = async () => {
    if (step === 1) {
      const values = getValues();
      const bmr = isCm
        ? calculateBmr(
            values.weight,
            values.height as number,
            values.age,
            values.sex as 'm' | 'f'
          )
        : calculateBmr(
            values.weight,
            { ft: values.heightFt as number, in: values.heightIn as number },
            values.age,
            values.sex as 'm' | 'f'
          );
      type keysMultiplier = keyof typeof activityMultiplier;
      const multipliedBmr =
        bmr * activityMultiplier[values.howActive as keysMultiplier];
      setTrueBmr(multipliedBmr);
    }
    const { fields } = steps[step];
    const output = await trigger(fields as (keyof Inputs)[], {
      shouldFocus: true
    });

    if (!output) return;
    if (step < stepCount - 1) setStep((currentStep) => currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (step > 0) setStep((currentStep) => currentStep - 1);
  };

  return (
    <form
      className="flex flex-col gap-4 min-w-full mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <span>
          Step {step + 1} of {stepCount}
        </span>
        <div className="relative w-full bg-secondary h-2 rounded-lg mt-2">
          <div
            style={{ width: `${Math.round(100 * ((step + 1) / stepCount))}%` }}
            className="absolute bg-primary h-2 rounded-lg top-0"
          />
        </div>
      </div>
      <div className="flex flex-col grow rounded-lg gap-1 max-w-5xl">
        {step === 0 &&
          personalInputs.map((input) => (
            <label key={input.id} htmlFor={input.id}>
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
        {step === 1 && (
          <div>
            <label key="height" htmlFor="height">
              Taille
              <div className="flex items-center gap-2 mt-2">
                {isCm ? (
                  <input
                    id="height"
                    placeholder="cms"
                    className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0"
                    {...register('height', {
                      required: true
                    })}
                  />
                ) : (
                  <>
                    <input
                      id="heightFt"
                      placeholder="ft"
                      className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0"
                      {...register('heightFt', {
                        required: true
                      })}
                    />
                    <input
                      id="heightIn"
                      placeholder="in"
                      className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0"
                      {...register('heightIn', {
                        required: true
                      })}
                    />
                  </>
                )}
                <button
                  type="button"
                  className={`btn btn-primary ${!isCm ? '' : 'btn-outline'}`}
                  onClick={() => {
                    setIsCm(false);
                  }}
                >
                  ft
                </button>
                <button
                  type="button"
                  className={`btn btn-primary ${isCm ? '' : 'btn-outline'}`}
                  onClick={() => {
                    setIsCm(true);
                  }}
                >
                  cm
                </button>
              </div>
              <FormError error={errors.height} />
            </label>
            <label key="weight" htmlFor="weight">
              Poids
              <div className="flex items-center gap-2 mt-2">
                {isKg ? (
                  <input
                    id="weight"
                    placeholder="kgs"
                    className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0"
                    {...register('weight', {
                      required: true
                    })}
                  />
                ) : (
                  <input
                    id="weight"
                    placeholder="lbs"
                    className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0"
                    {...register('weight', {
                      required: true
                    })}
                  />
                )}
                <button
                  type="button"
                  className={`btn btn-primary ${!isKg ? '' : 'btn-outline'}`}
                  onClick={() => {
                    setIsKg(false);
                  }}
                >
                  lbs
                </button>
                <button
                  type="button"
                  className={`btn btn-primary ${isKg ? '' : 'btn-outline'}`}
                  onClick={() => {
                    setIsKg(true);
                  }}
                >
                  kgs
                </button>
              </div>
              <FormError error={errors.weight} />
            </label>
            <label key="sex" htmlFor="sex">
              Sex
              <select
                id="sex"
                className="select bg-secondary text-white placeholder:text-white w-full focus:outline-0 mt-2"
                {...register('sex', {
                  required: true
                })}
              >
                <option value="m">Homme</option>
                <option value="f">Femme</option>
              </select>
              <FormError error={'' as unknown as FieldError} />
            </label>
            <label key="age" htmlFor="age">
              Âge
              <input
                id="age"
                className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0 mt-2"
                {...register('age', {
                  required: true
                })}
              />
              <FormError error={errors.age} />
            </label>
            <div>
              Votre niveau d&apos;activité
              <div className="flex flex-wrap gap-2 mt-2">
                <RadioButton
                  name="howActive"
                  id="howActive-1"
                  value="sedentary"
                  selectedValue={watch('howActive')}
                  register={() =>
                    register('howActive', {
                      required: true
                    })
                  }
                >
                  Sedentary (little to no exercise)
                </RadioButton>
                <RadioButton
                  name="howActive"
                  id="howActive-2"
                  value="light"
                  selectedValue={watch('howActive')}
                  register={() =>
                    register('howActive', {
                      required: true
                    })
                  }
                >
                  Lightly active (light exercise/sports 1-3 days/week)
                </RadioButton>
                <RadioButton
                  name="howActive"
                  id="howActive-3"
                  value="moderate"
                  selectedValue={watch('howActive')}
                  register={() =>
                    register('howActive', {
                      required: true
                    })
                  }
                >
                  Moderately active (moderate exercise/sports 3-5 days/week)
                </RadioButton>
                <RadioButton
                  name="howActive"
                  id="howActive-4"
                  value="very"
                  selectedValue={watch('howActive')}
                  register={() =>
                    register('howActive', {
                      required: true
                    })
                  }
                >
                  Very active (hard exercise/sports 6-7 days/week)
                </RadioButton>
                <RadioButton
                  name="howActive"
                  id="howActive-5"
                  value="super"
                  selectedValue={watch('howActive')}
                  register={() =>
                    register('howActive', {
                      required: true
                    })
                  }
                >
                  Super active (very hard exercise/sports & physical job or 2x
                  training)
                </RadioButton>
              </div>
              <FormError error={errors.howActive} />
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            Quel est votre objectif
            <div className="flex flex-wrap gap-2 mt-2">
              <RadioButton
                name="goal"
                id="goal-1"
                value="fat_loss"
                selectedValue={watch('goal')}
                register={() =>
                  register('goal', {
                    required: true
                  })
                }
              >
                Lose weight
              </RadioButton>
              <RadioButton
                name="goal"
                id="goal-2"
                value="muscle_gain"
                selectedValue={watch('goal')}
                register={() =>
                  register('goal', {
                    required: true
                  })
                }
              >
                Gain muscles
              </RadioButton>
              <RadioButton
                name="goal"
                id="goal-3"
                value="improve_stamina"
                selectedValue={watch('goal')}
                register={() =>
                  register('goal', {
                    required: true
                  })
                }
              >
                Improve stamina
              </RadioButton>
              <RadioButton
                name="goal"
                id="goal-4"
                value="maintenance"
                selectedValue={watch('goal')}
                register={() =>
                  register('goal', {
                    required: true
                  })
                }
              >
                Maintain a healthy lifestyle
              </RadioButton>
            </div>
            <FormError error={errors.goal} />
          </div>
        )}
        <div className="flex gap-4">
          {step > 0 && (
            <button
              type="button"
              className="btn btn-secondary grow max-w-xs"
              onClick={goToPreviousStep}
            >
              Retour
            </button>
          )}
          {step < stepCount - 1 && (
            <button
              type="button"
              className="btn btn-primary grow max-w-xs"
              onClick={goToNextStep}
            >
              Continuer
            </button>
          )}
          {step === stepCount - 1 && (
            <button type="submit" className="btn btn-primary grow max-w-xs">
              Continuer
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
