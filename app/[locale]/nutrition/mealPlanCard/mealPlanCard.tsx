import Image from 'next/image';
import DropdownButton from '@/components/buttons/dropdownButton';
import { Link } from '@/navigation';

type Plan = {
  recipes: number;
  meals: number;
  snacks: number;
};

type MealPlanCardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  plan: Plan;
};

const MealCard = ({
  id,
  title,
  description,
  imageUrl,
  plan
}: MealPlanCardProps) => {
  return (
    <div className="flex gap-4 justify-between mb-4">
      <div className="relative rounded-2xl aspect-square w-24">
        <Image
          className="absolute object-cover rounded-2xl"
          src={imageUrl}
          alt=""
          fill
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg">{title}</span>
        <span className="">{description}</span>
        <span className="">
          {plan.recipes} recipes - {plan.meals} meals - {plan.snacks} snack
        </span>
      </div>
      <DropdownButton>
        <Link
          className="text-left"
          href={{ pathname: '/nutrition/meal-plan/[id]', params: { id } }}
        >
          Edit
        </Link>
        <Link className="text-left" href={{ pathname: '/nutrition' }}>
          Delete
        </Link>
      </DropdownButton>
    </div>
  );
};

export default MealCard;
