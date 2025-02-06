// Jest
import '@testing-library/jest-dom';
import { api } from '../../react/services/api';
import fetchMock from 'jest-fetch-mock';

describe('Lorsque le site se charge', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  test('getRecipes récupère les données des recettes', async () => {
    const mockRecipes = [
      {
        id: 1,
        name: 'Tamagoyaki, Omelette japonaise',
        ingredients: ['oeuf', 'fromage', 'lait'],
        image: '',
        description: '',
        tags: ['déjeuner', 'dessert', 'végétarien'],
      },
      {
        id: 2,
        name: 'Salade de concombre',
        ingredients: ['salade', 'concombre', 'tomates', 'radis'],
        image: '',
        description: '',
        tags: ['plat', 'entrée', 'végétarien'],
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockRecipes));

    const recipes = await api.getRecipes();

    // Vérifie que fetch a bien été appelé avec l'URL correcte
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/recipes');

    // Vérifie que les données retournées sont correctes
    expect(recipes).toEqual(mockRecipes);
  });
});
