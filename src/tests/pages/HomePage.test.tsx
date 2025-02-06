// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';

// Jest
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Components
import HomePage from '../../react/pages/HomePage.tsx';

// Mock le composant pour voir s'il est rendu
jest.mock('../../react/components/RecipesDisplay.tsx', () => () => (
  <div data-testid="mock-recipes-display">Mock Recipes Display</div>
));
describe('Lorsque un utilisateur accède à la page d`accueil', () => {
  test('affiche RecipesDisplay', () => {
    render(<HomePage />);

    const recipesDisplay = screen.getByTestId('mock-recipes-display');
    expect(recipesDisplay).toBeInTheDocument();
  });
});
