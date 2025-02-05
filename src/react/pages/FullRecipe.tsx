// React
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// API
import { api } from '../services/api.ts';

// Components
import CreateTag from '../components/CreateTag.tsx';

// Types
interface RecipeType {
  id: number;
  name: string;
  ingredients: string[];
  image: string;
  description: string;
  tags: string[];
}

export default function FullRecipe() {
  const { id } = useParams();
  //const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [recipe, setRecipe] = useState<RecipeType | null>(null);

  useEffect(() => {
    api
      .getRecipes()
      .then((data) => {
        const foundRecipe = data.find((r: RecipeType) => r.id === Number(id));
        setRecipe(foundRecipe || null);
      })
      .catch((error) => console.error('Erreur de chargement', error));
  }, [id]);

  if (!recipe) {
    return <p>Recette introuvable</p>;
  }

  return (
    <div className="fullRecipe">
      <h2 className="fullRecipe__title">{recipe.name}</h2>
      <div className="fullRecipe__container">
        <img
          src={`http://localhost:3000${recipe.image}`}
          className="fullRecipe__container__img"
          alt={recipe.name}
        />
      </div>
      <p className="fullRecipe__description">{recipe.description}</p>
      <ul className="fullRecipe__ingredients">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="fullRecipe__ingredients__list">
            {ingredient}
          </li>
        ))}
      </ul>
      <ul className="fullRecipe__tags">
        {recipe.tags.map((tag) => (
          <CreateTag key={tag} tag={tag} />
        ))}
      </ul>
    </div>
  );
}
