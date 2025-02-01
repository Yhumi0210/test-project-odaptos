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

  const { fridge, recipes, filterRecipes, searchRecipes, shoppingList, addToShoppingList } =
    app;
  // Filtre les recettes en fonction du champ de recherche
  const filteredRecipes =
    searchedRecipe.trim() === '' ? recipes : searchRecipes(searchedRecipe);

  // Affiche soit toutes les recettes, soit celles réalisables avec le frigo
  const displayedRecipes = showFiltered ? filterRecipes() : filteredRecipes;

  const getMissingIngredients = (recipeIngredients: string[]) => {
    return recipeIngredients.filter(
      (ingredient) =>
        !fridge.some(
          (item) => item.name.toLowerCase() === ingredient.toLowerCase()
        )
    );
  };
  const isInShoppingList = (ingredient: string) => {
    return shoppingList.some((item) => item.name.toLowerCase() === ingredient.toLowerCase());
  };


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

      {/* Affiche toutes les recettes */}
      <ul>
        {displayedRecipes.map((recipe) => {
          const missingIngredients = getMissingIngredients(recipe.ingredients);

          return (
            <li key={recipe.id}>
              <h3>{recipe.name}</h3>
              <p>Ingrédients :</p>
              <ul>
                {recipe.ingredients.map((ingredient) => {
                  const isMissing = missingIngredients.includes(ingredient);
                  const alreadyInShoppingList = isInShoppingList(ingredient);
                  return (
                    <li key={ingredient}>
                      {ingredient}
                      {isMissing && !alreadyInShoppingList && (
                        <button onClick={() => addToShoppingList(ingredient)}>➕</button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
