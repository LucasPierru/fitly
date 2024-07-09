import SignInForm from '@/components/forms/signInForm.tsx/signInForm';

export default function Login({
  searchParams
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col max-w-screen-xl w-full px-8 justify-center gap-2 py-8">
      <SignInForm />
    </div>
  );
}
