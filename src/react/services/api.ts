const API_BASE_URL = 'http://localhost:3000/api';

export const api = {
  getRecipes: async () => {
    const response = await fetch(`${API_BASE_URL}/recipes`);
    if (!response.ok) throw new Error('Erreur lors du chargement des recettes');
    return response.json();
  },
  getIngredients: async () => {
    const response = await fetch(`${API_BASE_URL}/ingredients`);
    if (!response.ok)
      throw new Error('Erreur lors du chargement des ingrédients');
    return response.json();
  },
  getUser: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok)
      throw new Error("Erreur lors de la récupération de l'utilisateur");
    return response.json();
  },
};
