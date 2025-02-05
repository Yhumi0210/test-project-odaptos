// Hooks & Effects
import { Link } from 'react-router-dom';

// Types
interface RecipeType {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
}

interface RecipesTypes {
  recipe: RecipeType;
}

export default function CreateRecipeCard({ recipe }: RecipesTypes) {
  return (
    <>
      <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipes__list__card">
        <div className="recipes__list__card__container">
          <img
            className="recipes__list__card__container__img"
            src={`http://localhost:3000${recipe.image}`}
            alt={`photo de la recette ${recipe.name}`}
          />
        </div>
        <div className="recipes__list__card__ingredients">
          <h2 className="recipes__list__card__ingredients__title">{recipe.name}</h2>
          <ul className="recipes__list__card__ingredients__text">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </Link>
    </>
  );
}
