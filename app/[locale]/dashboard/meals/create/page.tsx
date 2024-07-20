import AddMealForm from '@/components/forms/addMealForm/addMealForm';

export default function CreateMealPage() {
  return (
    <div className="flex-1 flex flex-col max-w-screen-xl w-full px-8 justify-center gap-2 py-8">
      <h1 className="text-3xl text-bold">Create a meal</h1>
      <div className="flex gap-2 mb-4">
        Enter a meal name and nutrition information
      </div>
      <AddMealForm />
    </div>
  );
}
