// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';

// Jest
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock API
jest.mock('../../react/services/api.ts', () => ({
  api: {
    getRecipes: jest.fn(),
  },
}));

// Components
import FullRecipe from '../../react/pages/FullRecipe.tsx';
//import { api } from '../../react/services/api.ts';

// Mock du composant CreateTag pour vérifier seulement son affichage
jest.mock('../../react/components/reusable/CreateTag.tsx', () => ({ tag }: { tag: string }) => (
  <div data-testid="mock-create-tag">{tag}</div>
));

// Données mockées
const mockRecipe = {
  id: 1,
  name: 'Tamagoyaki, Omelette japonaise',
  ingredients: ['oeuf', 'fromage', 'lait'],
  image: '/images/omelette.jpg',
  description: 'Une recette simple pour un petit déjeuner, mais aussi un dessert !',
  tags: ['déjeuner', 'dessert', 'végétarien'],
};

describe('Lorsqu`un utilisateur a cliqué sur une recette', () => {
  beforeEach(() => {
    // Mock API pour retourner notre recette fictive
    const { api } = require('../../react/services/api.ts');
    api.getRecipes.mockResolvedValue([mockRecipe]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('affiche les détails de la recette', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Routes>
          <Route path="/recipe/:id" element={<FullRecipe />} />
        </Routes>
      </MemoryRouter>
    );

    // Vérifie que le titre de la recette s'affiche
    expect(await screen.findByText(/Tamagoyaki, Omelette japonaise/i)).toBeInTheDocument();

    // Vérifie que l’image s’affiche
    const image = screen.getByAltText(/Tamagoyaki, Omelette japonaise/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'http://localhost:3000/images/omelette.jpg');

    // Vérifie que la description s'affiche
    expect(
      screen.getByText(/Une recette simple pour un petit déjeuner, mais aussi un dessert !/i)
    ).toBeInTheDocument();

    // Vérifie les ingrédients
    expect(screen.getByText(/oeuf/i)).toBeInTheDocument();
    expect(screen.getByText(/fromage/i)).toBeInTheDocument();
    expect(screen.getByText(/lait/i)).toBeInTheDocument();

    // Vérifie les tags
    expect(screen.getAllByText(/dessert/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/déjeuner/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/végétarien/i).length).toBeGreaterThan(0);
  });

  test('affiche un message si la recette est introuvable', async () => {
    const { api } = require('../../react/services/api.ts');
    api.getRecipes.mockResolvedValue([mockRecipe]);

    render(
      <MemoryRouter initialEntries={['/recipe/999']}>
        <Routes>
          <Route path="/recipe/:id" element={<FullRecipe />} />
        </Routes>
      </MemoryRouter>
    );

    // Vérifie que le message 'Recette introuvable' est affiché
    expect(await screen.findByText(/Recette introuvable/i)).toBeInTheDocument();
  });
});
