export default function AddMealPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex-1 flex flex-col max-w-screen-xl w-full px-8 justify-center gap-2 py-8">
      <h1 className="text-3xl text-bold">Edit your meal</h1>
      <div className="flex gap-2 mb-4">{id}</div>
    </div>
  );
}
