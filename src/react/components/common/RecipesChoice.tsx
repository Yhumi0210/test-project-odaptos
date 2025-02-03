// React
import { useEffect, useState } from 'react';

// Components
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar.tsx';

// API
import { api } from '../../services/api.ts';

export default function RecipesChoice() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    api.getRecipes()
      .then(data => {
        setRecipes(data);
        setFilteredRecipes(data); // Initialiser les recettes filtrées
      })
      .catch(error => console.error("Erreur de chargement", error));
  }, []);

  const handleSearch = (searchedRecipe: string) => {
    const filtered = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchedRecipe.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <>
      <section className="recipes">
        <SearchBar onSearch={handleSearch} />
        {filteredRecipes.map((recipe) => (
          <Link to={''} key={recipe.id} className="recipes__card">
            <div className="recipes__card__container">
              <img
                className="recipes__card__container__img"
                src={`http://localhost:3000${recipe.image}`}
                alt={`photo de la recette ${recipe.name}`}
              />
            </div>
            <div className="recipes__card__ingredients">
              <h4 className="recipes__card__ingredients__title">
                {recipe.name}
              </h4>
              <ul className="recipes__card__ingredients__text">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
