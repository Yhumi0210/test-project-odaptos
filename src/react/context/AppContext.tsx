// React
import { createContext } from 'react';

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
  addIngredient: (name: string) => void;
  removeIngredient: (id: string) => void;
  recipes: Recipe[];
  filterRecipes: () => Recipe[];
  searchRecipes: (userInput: string) => Recipe[];
  shoppingList: Ingredient[];
  addToShoppingList: (name: string) => void;
  removeFromShoppingList: (id: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);
