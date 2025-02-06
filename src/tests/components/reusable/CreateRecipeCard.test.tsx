// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// Jest
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Components
import CreateRecipeCard from '../../../react/components/reusable/CreateRecipeCard.tsx';

const mockRecipe = {
  id: 1,
  name: 'Tamagoyaki, Omelette japonaise',
  image: '/images/omelette.jpg',
  ingredients: ['oeuf', 'fromage', 'lait'],
};

describe('Une carte de recette est créé pour chaque recette', () => {
  test('affiche correctement l`image de la recette', () => {
    render(
      <MemoryRouter>
        <CreateRecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );

    const recipeImage = screen.getByRole('img');
    expect(recipeImage).toBeInTheDocument();
  });
  test('affiche correctement le nom de la recette', () => {
    render(
      <MemoryRouter>
        <CreateRecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );

    const recipeName = screen.getByText(/Tamagoyaki, Omelette japonaise/i);
    expect(recipeName).toBeInTheDocument();
  });
  test('affiche tous les ingrédients de la recette', () => {
    render(
      <MemoryRouter>
        <CreateRecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );

    // Récupère tous les ingrédients de la recette <li>
    const ingredientsList = screen.getAllByRole('listitem');

    // Vérifie que la liste contient les 3 ingrédients attendus
    expect(ingredientsList).toHaveLength(3);

    expect(ingredientsList[0]).toHaveTextContent('oeuf');
    expect(ingredientsList[1]).toHaveTextContent('fromage');
    expect(ingredientsList[2]).toHaveTextContent('lait');
  });
});
