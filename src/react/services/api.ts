const API_BASE_URL = 'http://localhost:3000/api';

export const api = {
  getRecipes: async () => {
    const response = await fetch(`${API_BASE_URL}/recipes`);
    return response.json();
  },

  // getPreferences: async () => {
  //   const response = await fetch(`${API_BASE_URL}/user/preferences`);
  //   return response.json();
  // },
  //
  // savePreferences: async (preferences: { tags: string[]; searchText: string }) => {
  //   try {
  //     console.log('📤 Envoi des préférences au backend :', preferences);
  //     const response = await fetch(`${API_BASE_URL}/user/preferences`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(preferences),
  //     });
  //
  //     if (!response.ok) {
  //       throw new Error(`Erreur serveur: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de envoi des préférences :', error);
  //   }
  // },
};
