// React
import React, { createContext } from 'react';

// Types
interface Ingredient {
  id: string;
  name: string;
}
interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
}
interface AppContextType {
  fridge: Ingredient[];
  setFridge: React.Dispatch<React.SetStateAction<string[]>>;
  addIngredient: (name: string) => void;
  removeIngredient: (id: string) => void;
  recipes: Recipe[];
  filterRecipes: () => Recipe[];
  searchRecipes: (userInput: string) => Recipe[];
  // shoppingList: string[];
  // setShoppingList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AppContext = createContext<AppContextType | null>(null);
