// React
import { useContext, useState } from 'react';

// Context
import { AppContext } from '../context/AppContext.tsx';

export default function Recipes() {
  const [searchedRecipe, setSearchedRecipe] = useState<string>('');
  const [showFiltered, setShowFiltered] = useState<boolean>(false);
  const app = useContext(AppContext);

  if (!app) {
    throw new Error('Recipes must be used within an AppProvider');
  }

  const { recipes, filterRecipes, searchRecipes } = app;
  // Filtre les recettes en fonction du champ de recherche
  const filteredRecipes =
    searchedRecipe.trim() === '' ? recipes : searchRecipes(searchedRecipe);

  // Affiche soit toutes les recettes, soit celles réalisables avec le frigo
  const displayedRecipes = showFiltered ? filterRecipes() : filteredRecipes;

  return (
    <div>
      <h2>Liste des recettes :</h2>
      <input
        type="text"
        placeholder="Rechercher une recette"
        value={searchedRecipe}
        onChange={(e) => setSearchedRecipe(e.target.value)}
      />
      <button onClick={() => setSearchedRecipe('')}>Effacer</button>

      {/* Filtre par ingrédients disponibles */}
      <button onClick={() => setShowFiltered(!showFiltered)}>
        {showFiltered ? 'Voir toutes les recettes' : 'Recettes réalisables'}
      </button>

      {/* Affichage toutes les recettes */}
      <ul>
        {displayedRecipes.length > 0 ? (
          displayedRecipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.name}</h3>
              <p>Ingrédients : {recipe.ingredients.join(', ')}</p>
            </li>
          ))
        ) : (
          <p>Aucune recette ne correspond à votre recherche.</p>
        )}
      </ul>
    </div>
  );
}
