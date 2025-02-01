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
  const [shoppingList, setShoppingList] = useState<Ingredient[]>(() => {
    const storedList = localStorage.getItem('shoppingList');
    return storedList ? JSON.parse(storedList) : [];
  });
  //const [recipes, setRecipes] = useState<Recipe[]>([
  const [recipes] = useState<Recipe[]>([
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

  // Frigo
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
  // Liste de courses
  const addToShoppingList = (name: string) => {
    const alreadyInFridge = fridge.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (alreadyInFridge) {
      alert(`${name} est déjà dans le frigo !`);
      return;
    }

    const alreadyInList = shoppingList.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (alreadyInList) {
      alert(`${name} est déjà dans la liste de courses !`);
      return;
    }

    const newIngredient = { id: Date.now().toString(), name };
    const updatedList = [...shoppingList, newIngredient];
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  };

  const removeFromShoppingList = (id: string) => {
    const updatedList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  };

  // Recettes
  const filterRecipes = () => {
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
        shoppingList,
        addToShoppingList,
        removeFromShoppingList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
