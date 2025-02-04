// React
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// Components
import SearchBar from './SearchBar.tsx';
import TagFilter from './TagFilter.tsx';

// API
import { api } from '../services/api.ts';
import FilteredRecipes from './FilteredRecipes.tsx';

// Types
interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  image: string;
  description: string;
  tags: string[];
}

export default function RecipesChoice() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('selectedTags') || '[]');
  });
  const [searchText, setSearchText] = useState<string>(() => {
    return localStorage.getItem('searchText') || '';
  });
  const allTags = Array.from(new Set(recipes.flatMap((recipe) => recipe.tags)));

  useEffect(() => {
    api
      .getRecipes()
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
      })
      .catch((error) => console.error('Erreur de chargement', error));
    // api
    //   .getPreferences()
    //   .then((data) => {
    //     if (data.tags) setSelectedTags(data.tags);
    //     if (data.searchText) setSearchText(data.searchText);
    // });
  }, []);

  useEffect(() => {
    let filtered = recipes;

    if (selectedTags.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedTags.every((tag) => recipe.tags.includes(tag))
      );
    }

    if (searchText.length > 0) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchText.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchText.toLowerCase())
          )
      );
    }

    setFilteredRecipes(filtered);
  }, [selectedTags, searchText, recipes]);

  const handleTagSelect = (tags: string[]) => {
    setSelectedTags(tags);
    setFilteredRecipes(
      recipes.filter(
        (recipe) =>
          (searchText === '' ||
            recipe.name.toLowerCase().includes(searchText.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.toLowerCase().includes(searchText.toLowerCase())
            )) &&
          (tags.length === 0 || tags.every((tag) => recipe.tags.includes(tag)))
      )
    );
  };

  const handleSearch = (searchedRecipe: string) => {
    setSearchText(searchedRecipe);
    setFilteredRecipes(
      recipes.filter(
        (recipe) =>
          (recipe.name.toLowerCase().includes(searchedRecipe.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.toLowerCase().includes(searchedRecipe.toLowerCase())
            )) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) => recipe.tags.includes(tag)))
      )
    );
  };

  return (
    <>
      <section className="recipes">
        <SearchBar onSearch={handleSearch} initialSearchText={searchText} />
        <TagFilter
          availableTags={allTags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />
        <div className="recipes__list">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              //
              <FilteredRecipes key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <div className="recipes">
              <p className="recipes__text">
                Aucune recette trouvée, veuillez modifier votre recherche ou
                tags
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
