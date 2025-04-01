'use client';

import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { login } from '@/requests/auth';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SignUpForm = () => {
  const t = useTranslations();
  const router = useRouter();

  const schema = z
    .object({
      email: z
        .string({ message: t('Common.errors.isRequired') })
        .email(t('Common.errors.invalidEmail')),
      password: z.string({ message: t('Common.errors.isRequired') })
    })
    .required();

  type Inputs = z.infer<typeof schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { token, message } = await login(data.email, data.password);
    if (token) {
      router.push('/dashboard');
      form.reset();
    } else {
      form.setError('email', { message: '' });
      form.setError('password', { message });
    }
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg mx-auto">{t('Login.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 min-w-full mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col grow rounded-lg gap-4 items-center">
              {inputs.map((input) => (
                <FormField
                  key={input.id}
                  control={form.control}
                  name={input.id}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2">{input.label}</FormLabel>
                      <FormControl>
                        <Input
                          id={input.id}
                          type={input.type}
                          {...field}
                          className="mb-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" size="lg" className="text-white">
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <span className="text-center w-full block">
          Don&apos;t have an account ?{' '}
          <Link href="/signup" className="hover:text-primary">
            Sign up
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
