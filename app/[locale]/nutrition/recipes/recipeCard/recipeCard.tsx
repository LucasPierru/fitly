import Image from 'next/image';
import { RecipeSummary } from '@/types/recipes';
import { Link } from '@/navigation';

type RecipeCardProps = {
  recipe: RecipeSummary;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link
      key={recipe.id}
      href={{ pathname: '/nutrition/recipes/[id]', params: { id: recipe.id } }}
    >
      <div className="relative aspect-square">
        <Image
          src={`https://img.spoonacular.com/recipes/${recipe.id}-636x393.${recipe.imageType}`}
          alt={recipe.title}
          fill
          className="absolute object-cover rounded-box"
        />
      </div>
      <span className="block mt-2 font-semibold">{recipe.title}</span>
    </Link>
  );
};

export default RecipeCard;
