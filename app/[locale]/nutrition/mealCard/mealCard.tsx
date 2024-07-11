import Image from 'next/image';
import DropdownButton from '@/components/buttons/dropdownButton';
import { Link } from '@/navigation';

type MealCardProps = {
  title: string;
  ingredients: string;
  description: string;
  imageUrl: string;
};

const MealCard = ({
  title,
  ingredients,
  description,
  imageUrl
}: MealCardProps) => {
  return (
    <div className="flex gap-4 justify-between">
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
        <span className="">{ingredients}</span>
        <span className="">{description}</span>
      </div>
      <DropdownButton>
        <Link className="text-left" href={{ pathname: '/nutrition' }}>
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
