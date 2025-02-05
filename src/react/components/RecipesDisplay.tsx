// React
import { useEffect, useState } from 'react';

// API
import { api } from '../services/api.ts';
import CreateRecipeCard from './reusable/CreateRecipeCard.tsx';

// Components
import SearchBar from './SearchBar.tsx';
import TagsList from './TagsList.tsx';
import ClearSearchAndTags from './reusable/ClearSearchAndTags.tsx';

// Types
interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  image: string;
  description: string;
  tags: string[];
}

export default function RecipesDisplay() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [foundRecipes, setFoundRecipes] = useState<Recipe[]>(recipes);
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('selectedTags') || '[]');
  });
  const [searchText, setSearchText] = useState<string>(() => {
    return localStorage.getItem('searchText') || '';
  });
  // créé un tableau de tous les tags uniques des recettes
  const allTags = Array.from(new Set(recipes.flatMap((recipe) => recipe.tags)));

  useEffect(() => {
    api
      .getRecipes()
      .then((data) => {
        setRecipes(data);
        setFoundRecipes(data);
      })
      .catch((error) => console.error('Erreur de chargement', error));

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let found = recipes;

    if (selectedTags.length > 0) {
      found = found.filter((recipe) => selectedTags.every((tag) => recipe.tags.includes(tag)));
    }

    if (searchText.length > 0) {
      found = found.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchText.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    }

    setFoundRecipes(found);
  }, [selectedTags, searchText, recipes]);

  const updateRecipesByFilters = (newTags?: string[], newSearchText?: string) => {
    // Ajoute les tags à son setter
    if (newTags !== undefined) {
      setSelectedTags(newTags);
      localStorage.setItem('selectedTags', JSON.stringify(newTags));
    }

    // Ajoute la recherche à son setter
    if (newSearchText !== undefined) {
      setSearchText(newSearchText);
      localStorage.setItem('searchText', newSearchText);
    }

    // Définit l'état actuel des filtres
    const currentTags = newTags !== undefined ? newTags : selectedTags;
    const currentSearchText = newSearchText !== undefined ? newSearchText : searchText;

    // Applique les filtres
    setFoundRecipes(
      recipes.filter(
        (recipe) =>
          (currentSearchText === '' ||
            recipe.name.toLowerCase().includes(currentSearchText.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.toLowerCase().includes(currentSearchText.toLowerCase())
            )) &&
          (currentTags.length === 0 || currentTags.every((tag) => recipe.tags.includes(tag)))
      )
    );
  };

  return (
    <>
      <section className="recipes">
        <SearchBar
          onSearch={(searchedRecipes) => updateRecipesByFilters(undefined, searchedRecipes)}
          searchedText={searchText}
        />
        <TagsList
          availableTags={allTags}
          selectedTags={selectedTags}
          onTagSelect={(tags) => updateRecipesByFilters(tags, undefined)}
        />
        {(selectedTags.length > 0 || searchText.length > 0) && (
          <ClearSearchAndTags
            setSelectedTags={setSelectedTags}
            setSearchText={setSearchText}
            setFoundRecipes={setFoundRecipes}
            recipes={recipes}
          />
        )}
        <div className="recipes__list">
          {foundRecipes.length > 0 ? (
            foundRecipes.map((recipe) => <CreateRecipeCard key={recipe.id} recipe={recipe} />)
          ) : (
            <div className="recipes">
              <p className="recipes__text">
                Aucune recette trouvée, veuillez modifier votre recherche ou tags
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
