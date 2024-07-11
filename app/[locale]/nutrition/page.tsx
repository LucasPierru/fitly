import { redirect } from 'next/navigation';
import Filter from '@/components/filter/filter';
import { capitalizeWord } from '@/utils/utils';

export default function NutritionPage({
  searchParams
}: {
  searchParams: { time: string };
}) {
  const filters = ['Breakfast', 'Lunch', 'Dinner'];
  const defaultTimeFilter = 'breakfast';

  const selectFilter = (filter: string) => {
    redirect(`/nutrition?time=${filter}`);
  };

  return (
    <div className="flex-1 flex flex-col max-w-screen-xl w-full px-8 justify-center gap-2 py-8">
      <h1 className="text-3xl text-bold">Setup your meals</h1>
      <div>
        <select className="select select-primary bg-secondary rounded-full">
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
        <Filter
          selectedFilter={capitalizeWord(
            defaultTimeFilter || searchParams.time
          )}
          filters={filters}
          selectFilter={selectFilter}
        />
      </div>
    </div>
  );
}
