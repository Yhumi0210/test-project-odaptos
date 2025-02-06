// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// Jest
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock API
jest.mock('../../react/services/api.ts', () => ({
  api: {
    getRecipes: jest.fn().mockResolvedValue([]),
  },
}));

// Components
import RecipesDisplay from '../../react/components/RecipesDisplay.tsx';
import { api } from '../../react/services/api.ts';

// Mock des recettes
const mockRecipes = [
  {
    id: 1,
    name: 'Tamagoyaki, Omelette japonaise',
    ingredients: ['oeuf', 'fromage', 'lait'],
    image: '/images/omelette.jpg',
    description: 'Omelette japonaise',
    tags: ['déjeuner', 'dessert'],
  },
  {
    id: 2,
    name: 'Salade de concombre',
    ingredients: ['concombre', 'vinaigre'],
    image: '/images/salade.jpg',
    description: 'Une salade fraîche',
    tags: ['entrée', 'végétarien'],
  },
];

describe('Lorsqu`un utilisateur accède à la page d`accueil, RecipesDisplay est appelé', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  beforeEach(() => {
    (api.getRecipes as jest.Mock).mockResolvedValue(mockRecipes);
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('affiche les recettes après chargement des données', async () => {
    render(
      <MemoryRouter>
        <RecipesDisplay />
      </MemoryRouter>
    );

    // Attends que les recettes soient affichées
    expect(await screen.findByText(/Tamagoyaki, Omelette japonaise/i)).toBeInTheDocument();
    expect(await screen.findByText(/Salade de concombre/i)).toBeInTheDocument();
  });

  test('l`utilisateur clique sur l`icone de recherche et filtre les recettes avec la barre de recherche', async () => {
    render(
      <MemoryRouter>
        <RecipesDisplay />
      </MemoryRouter>
    );

    // Attends l'affichage des recettes
    await waitFor(() => screen.getByText(/Tamagoyaki, Omelette japonaise/i));

    // Sélectionne et clique sur l'icône de recherche pour ouvrir l'input
    const searchIcon = screen.getByTestId('search-icon');
    fireEvent.click(searchIcon);

    // Attends que l'input soit affiché après le clic
    const searchInput = await screen.findByPlaceholderText('Recette ou ingrédient');
    expect(searchInput).toBeInTheDocument();

    // Simule la recherche "Salade"
    fireEvent.change(searchInput, { target: { value: 'Salade' } });

    // Vérifie que seule la recette correspondante apparaît
    await waitFor(() => {
      expect(screen.getByText(/Salade de concombre/i)).toBeInTheDocument();
      expect(screen.queryByText(/Tamagoyaki, Omelette japonaise/i)).not.toBeInTheDocument();
    });
  });

  test('affiche un message si aucune recette ne correspond à la recherche', async () => {
    render(
      <MemoryRouter>
        <RecipesDisplay />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Tamagoyaki, Omelette japonaise/i));
    // Sélectionne et clique sur l'icône de recherche pour ouvrir l'input
    const searchIcon = screen.getByTestId('search-icon');
    fireEvent.click(searchIcon);

    // Attends que l'input soit affiché après le clic
    const searchInput = await screen.findByPlaceholderText('Recette ou ingrédient');
    expect(searchInput).toBeInTheDocument();

    // Simule une recherche qui ne correspond à rien
    fireEvent.change(searchInput, { target: { value: 'Pizza' } });

    // Vérifie que le message "Aucune recette trouvée" s'affiche
    await waitFor(() => {
      expect(screen.getByText(/Aucune recette trouvée/i)).toBeInTheDocument();
    });
  });

  test('l`utilisateur clique sur la liste de tags et filtre les recettes par tags', async () => {
    render(
      <MemoryRouter>
        <RecipesDisplay />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Tamagoyaki, Omelette japonaise/i));

    const TagList = screen.getByTestId('tag-list-icon');
    fireEvent.click(TagList);

    // Simule le clic sur un tag "végétarien"
    const vegetarianTag = screen.getByText(/végétarien/i);
    fireEvent.click(vegetarianTag);

    // Vérifie que seule la salade de concombre apparaît
    await waitFor(() => {
      expect(screen.getByText(/Salade de concombre/i)).toBeInTheDocument();
      expect(screen.queryByText(/Tamagoyaki, Omelette japonaise/i)).not.toBeInTheDocument();
    });
  });

  test('réinitialise les filtres et affiche toutes les recettes', async () => {
    render(
      <MemoryRouter>
        <RecipesDisplay />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Tamagoyaki, Omelette japonaise/i));

    // Sélectionne et clique sur l'icône de recherche pour ouvrir l'input
    const searchIcon = screen.getByTestId('search-icon');
    fireEvent.click(searchIcon);

    // Attends que l'input soit affiché après le clic
    const searchInput = await screen.findByPlaceholderText('Recette ou ingrédient');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'Salade' } });

    await waitFor(() => {
      expect(screen.getByText(/Salade de concombre/i)).toBeInTheDocument();
      expect(screen.queryByText(/Tamagoyaki, Omelette japonaise/i)).not.toBeInTheDocument();
    });

    // Simule le clic sur le bouton de réinitialisation
    const clearButton = screen.getByTestId('clear-icon');

    // Simule un clic sur l'icône
    fireEvent.click(clearButton);

    // Vérifier que toutes les recettes réapparaissent
    await waitFor(() => {
      expect(screen.getByText(/Tamagoyaki, Omelette japonaise/i)).toBeInTheDocument();
      expect(screen.getByText(/Salade de concombre/i)).toBeInTheDocument();
    });
  });
});
