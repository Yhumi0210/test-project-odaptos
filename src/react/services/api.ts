const API_BASE_URL = 'http://localhost:3000/api';

export const api = {
  getRecipes: async () => {
    const response = await fetch(`${API_BASE_URL}/recipes`);
    return response.json();
  },
};
