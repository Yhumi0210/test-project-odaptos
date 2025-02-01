import React, { useState } from 'react';
import { AppContext } from '../context/AppContext.tsx';

// Types
interface ChildrenProps {
  children: React.ReactNode;
}
interface Ingredient {
  id: string;
  name: string;
}
interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
}

export const AppProvider = ({ children }: ChildrenProps) => {
  const [fridge, setFridge] = useState<Ingredient[]>(() => {
    const storedFridge = localStorage.getItem('fridge');
    return storedFridge ? JSON.parse(storedFridge) : [];
  });
  const [shoppingList, setShoppingList] = useState([]);
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: '1',
      name: 'Salade César',
      ingredients: ['salade', 'poulet', 'croutons', 'parmesan'],
    },
    {
      id: '2',
      name: 'Pâtes Carbonara',
      ingredients: ['pâtes', 'lardons', 'crème', 'oeuf', 'parmesan'],
    },
    { id: '3', name: 'Omelette', ingredients: ['oeuf', 'sel', 'poivre'] },
  ]);

  const addIngredient = (name: string) => {
    const newIngredient = { id: Date.now().toString(), name: name };
    const updatedFridge = [...fridge, newIngredient];
    setFridge(updatedFridge);
    localStorage.setItem('fridge', JSON.stringify(updatedFridge));
  };

  const removeIngredient = (id: string) => {
    const updatedFridge = fridge.filter((ingredient) => ingredient.id !== id);
    setFridge(updatedFridge);
    localStorage.setItem('fridge', JSON.stringify(updatedFridge));
  };

  const filterRecipes = () => {
    console.log('Ingrédients dans le frigo :', fridge);
    return recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        fridge.some(
          (item) => item.name.toLowerCase() === ingredient.toLowerCase()
        )
      )
    );
  };

  const searchRecipes = (userInput: string) => {
    if (!userInput.trim()) return recipes;
    const result = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(userInput.toLowerCase())
    );
    return result;
  };

  return (
    <AppContext.Provider
      value={{
        fridge,
        addIngredient,
        removeIngredient,
        recipes,
        filterRecipes,
        searchRecipes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
