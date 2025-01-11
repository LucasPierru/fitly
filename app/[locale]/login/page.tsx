import SignInForm from '@/components/forms/signInForm/signInForm';
import H1 from '@/components/heading/h1';

export const metadata = {
  title: 'Fitly | Login'
};

export default function LoginPage({
  searchParams
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col max-w-screen-sm h-full mx-auto my-auto w-full px-8 justify-center gap-4 py-8">
      <H1 className="mx-auto">Sign in to your account</H1>
      <SignInForm />
    </div>
  );
}
