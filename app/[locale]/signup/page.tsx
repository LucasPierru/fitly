import SignUpForm from '@/components/forms/signUpForm/signUpForm';

export const metadata = {
  title: 'Fitly | Signup'
};

export default function SignUpPage({
  searchParams
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col max-w-screen-xl mx-auto w-full px-8 justify-center gap-2 py-8">
      <h1 className="text-3xl text-bold">Welcome to Fitly</h1>
      <span className="text-primary">Let&apos;s set up your account</span>
      <SignUpForm />
    </div>
  );
}
