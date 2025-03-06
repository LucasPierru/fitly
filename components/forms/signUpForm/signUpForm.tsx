'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormError from '@/components/errors/formError/formError';
import { signUp } from '@/requests/auth';
import RadioButton from '../../buttons/radioButton/radioButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem
} from '@/components/ui/select';
import { DatePicker } from '@/components/date-picker/date-picker';

const SignUpForm = () => {
  const t = useTranslations('Common');
  const [step, setStep] = useState(0);
  const [isKg, setIsKg] = useState(true);
  const [isCm, setIsCm] = useState(true);
  const [trueBmr, setTrueBmr] = useState(0);

  const router = useRouter();

  // eslint-disable-next-line no-console
  console.log({ trueBmr });
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
    return { cm: feet * 30.5 + inches * 2.54, ft: feet, in: inches };
  };

  const convertCmToFeetAndInches = (cm: number) => {
    const inches = Number(cm) / 2.54;
    const ft = Math.floor(inches / 12);
    const remainingInches = Math.round(inches % 12);
    return { cm: Number(cm), ft, in: remainingInches };
  };

  const calculateBmr = (
    weight: number,
    height: { cm: number; ft: number; in: number },
    age: number,
    sex: 'male' | 'female'
  ) => {
    const kgWeight = isKg ? weight : convertLbsToKgs(weight);
    const h = isCm
      ? { cm: Number(height.cm) }
      : convertFeetAndInchesToCms(Number(height.ft), Number(height.in));
    if (sex === 'male') {
      return 10 * kgWeight + 6.25 * h.cm - 5 * age + 5;
    }
    return 10 * kgWeight + 6.25 * h.cm - 5 * age - 161;
  };

  const schema = z
    .object({
      firstName: z.string().nonempty(t('errors.isRequired')),
      lastName: z.string().nonempty(t('errors.isRequired')),
      email: z
        .string()
        .nonempty(t('errors.isRequired'))
        .email(t('errors.invalidEmail')),
      password: z.string().nonempty(t('errors.isRequired')),
      confirmPassword: z.string().nonempty(t('errors.isRequired')),
      height: z
        .object({
          cm: z.coerce
            .number({ message: t('errors.isNotNumber') })
            .int()
            .positive(t('errors.isNotPositive'))
            .optional(),
          ft: z.coerce
            .number({ message: t('errors.isNotNumber') })
            .int()
            .positive(t('errors.isNotPositive'))
            .optional(),
          in: z.coerce
            .number({ message: t('errors.isNotNumber') })
            .int()
            .positive(t('errors.isNotPositive'))
            .optional()
        })
        .refine(
          (val) => {
            if (isCm && val.cm) {
              return val.cm > 0;
            }
            return val.ft && val.ft > 0 && val.in && val.in >= 0;
          },
          {
            message: t('errors.isNotPositive'),
            path: ['height']
          }
        )
        .transform((val) => {
          if (isCm) {
            return convertCmToFeetAndInches(Number(val.cm) || 0);
          }
          return convertFeetAndInchesToCms(val.ft || 0, val.in || 0);
        }),
      weight: z.coerce
        .number({ message: t('errors.isNotNumber') })
        .positive(t('errors.isNotPositive')),
      sex: z.enum(['male', 'female'], { message: t('errors.isRequired') }),
      birthday: z.date({ message: t('errors.isRequired') }),
      howActive: z.enum(
        ['sedentary', 'light', 'moderate', 'active', 'very_active'],
        { message: t('errors.isRequired') }
      ),
      goal: z.enum(
        ['fat_loss', 'muscle_gain', 'improve_stamina', 'maintenance'],
        { message: t('errors.isRequired') }
      )
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords did not match',
          path: ['confirmPassword']
        });
      }
    });

  type Inputs = z.infer<typeof schema>;

  const form = useForm<Inputs>({ resolver: zodResolver(schema) });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    getValues,
    formState: { errors }
  } = form;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const kgWeight = isKg ? data.weight : convertLbsToKgs(data.weight);
    const height = convertFeetAndInchesToCms(data.height.ft, data.height.in);
    await signUp({
      ...data,
      height: height.cm,
      weight: kgWeight,
      bmr: trueBmr
    });
    reset();
    router.push('/signup/subscribe');
  };

  const personalInputs: {
    id: keyof Inputs;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    {
      id: 'lastName',
      label: 'Nom',
      placeholder: 'e.g. Doe',
      type: 'text'
    },
    {
      id: 'firstName',
      label: 'Prénom',
      placeholder: 'e.g. John',
      type: 'text'
    },
    {
      id: 'email',
      label: 'Courriel',
      placeholder: 'e.g. john.doe@gmail.com',
      type: 'text'
    },
    {
      id: 'password',
      label: 'Mot de passe',
      placeholder: 'e.g. abc123',
      type: 'password'
    },
    {
      id: 'confirmPassword',
      label: 'Confirmer mot de passe',
      placeholder: 'e.g. abc123',
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
      id: 'birthday',
      label: 'Birthday'
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

  const calculateAge = (birthday: Date) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }
    return age;
  };

  const goToNextStep = async () => {
    if (step === 1) {
      const values = getValues();
      const bmr = calculateBmr(
        values.weight,
        values.height,
        calculateAge(values.birthday),
        values.sex as 'male' | 'female'
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
    <Form {...form}>
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
              style={{
                width: `${Math.round(100 * ((step + 1) / stepCount))}%`
              }}
              className="absolute bg-primary h-2 rounded-lg top-0"
            />
          </div>
        </div>
        <div className="flex flex-col grow rounded-lg w-full">
          {step === 0 &&
            personalInputs.map((input) => (
              <FormField
                control={form.control}
                key={input.id}
                name={input.id}
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor={input.id}>{input.label}</Label>
                    <Input
                      id={field.name}
                      type={input.type}
                      className="w-full focus:outline-0 mt-2"
                      placeholder={input.placeholder}
                      {...register(field.name, {
                        required: true
                      })}
                    />
                    <FormError error={errors[input.id]?.message as string} />
                  </FormItem>
                )}
              />
            ))}
          {step === 1 && (
            <div className="grid w-full items-center gap-1.5">
              <Label key="height" htmlFor="height">
                Taille
              </Label>
              <div className="flex gap-2">
                {isCm ? (
                  <Input
                    id="height"
                    placeholder="cms"
                    className="w-full focus:outline-0 mt-2"
                    {...register('height.cm', {
                      required: true
                    })}
                  />
                ) : (
                  <>
                    <Input
                      id="heightFt"
                      placeholder="ft"
                      className="w-full focus:outline-0 mt-2"
                      {...register('height.ft', {
                        required: true
                      })}
                    />
                    <Input
                      id="heightIn"
                      placeholder="in"
                      className="w-full focus:outline-0 mt-2"
                      {...register('height.in', {
                        required: true
                      })}
                    />
                  </>
                )}
                <Button
                  type="button"
                  variant={isCm ? 'outline' : 'default'}
                  className="mt-2"
                  onClick={() => {
                    setIsCm(false);
                  }}
                >
                  ft
                </Button>
                <Button
                  type="button"
                  variant={!isCm ? 'outline' : 'default'}
                  className="mt-2"
                  onClick={() => {
                    setIsCm(true);
                  }}
                >
                  cm
                </Button>
              </div>
              <FormError
                error={
                  isCm
                    ? errors.height?.cm?.message
                    : errors.height?.ft?.message || errors.height?.in?.message
                }
              />
              <Label key="weight" htmlFor="weight">
                Poids
              </Label>
              <div className="flex items-center gap-2 mt-2">
                {isKg ? (
                  <Input
                    id="weight"
                    placeholder="kgs"
                    className="w-full focus:outline-0"
                    {...register('weight', {
                      required: true,
                      valueAsNumber: true
                    })}
                  />
                ) : (
                  <Input
                    id="weight"
                    placeholder="lbs"
                    className="w-full focus:outline-0"
                    {...register('weight', {
                      required: true,
                      valueAsNumber: true
                    })}
                  />
                )}
                <Button
                  type="button"
                  variant={isKg ? 'outline' : 'default'}
                  onClick={() => {
                    setIsKg(false);
                  }}
                >
                  lbs
                </Button>
                <Button
                  type="button"
                  variant={!isKg ? 'outline' : 'default'}
                  onClick={() => {
                    setIsKg(true);
                  }}
                >
                  kgs
                </Button>
              </div>
              <FormError error={errors.weight?.message} />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid">
                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem>
                        <Label key="sex" htmlFor="sex">
                          Sex
                        </Label>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a sex" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="male">Homme</SelectItem>
                              <SelectItem value="female">Femme</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormError error={errors.sex?.message} />
                </div>
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <Label key="birthday" htmlFor="birthday">
                        Birthday
                      </Label>
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                      />
                      <FormError error={errors.birthday?.message} />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="howActive">Votre niveau d&apos;activité</Label>
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
                <FormError error={errors.howActive?.message} />
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
              <FormError error={errors.goal?.message} />
            </div>
          )}
          <div className="flex gap-4">
            {step > 0 && (
              <Button
                variant="outline"
                type="button"
                onClick={goToPreviousStep}
              >
                Retour
              </Button>
            )}
            {step < stepCount - 1 && (
              <Button type="button" onClick={goToNextStep}>
                Continuer
              </Button>
            )}
            {step === stepCount - 1 && <Button type="submit">Continuer</Button>}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
