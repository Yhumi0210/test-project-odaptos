// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';

// Jest
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import ClearSearchAndTags from '../../../react/components/reusable/ClearSearchAndTags.tsx';

const mockSetSelectedTags = jest.fn();
const mockSetSearchText = jest.fn();
const mockSetFoundRecipes = jest.fn();
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

describe('Lorsque un utilisateur a cliqué sur un tag ou qu`il a écrit quelque chose dans la barre de recherche', () => {
  beforeEach(() => {
    localStorage.setItem('selectedTags', JSON.stringify(['végétarien']));
    localStorage.setItem('searchText', 'oeuf');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  test('affiche le bouton de suppression', () => {
    render(
      <ClearSearchAndTags
        setSelectedTags={mockSetSelectedTags}
        setSearchText={mockSetSearchText}
        setFoundRecipes={mockSetFoundRecipes}
        recipes={mockRecipes}
      />
    );

    const clearButton = screen.getByTestId('clear-icon');
    expect(clearButton).toBeInTheDocument();
  });
  test('réinitialise alors les filtres et localStorage au clic et affiche à nouveau toutes les recettes', () => {
    render(
      <ClearSearchAndTags
        setSelectedTags={mockSetSelectedTags}
        setSearchText={mockSetSearchText}
        setFoundRecipes={mockSetFoundRecipes}
        recipes={mockRecipes}
      />
    );

    const clearButton = screen.getByTestId('clear-icon');

    // Simule un clic sur l'icône
    fireEvent.click(clearButton);

    // Vérifie que les tags et la recherche sont bien effacées
    expect(localStorage.getItem('selectedTags')).toBeNull();
    expect(localStorage.getItem('searchText')).toBeNull();

    expect(mockSetSelectedTags).toHaveBeenCalledWith([]);
    expect(mockSetSearchText).toHaveBeenCalledWith('');
    expect(mockSetFoundRecipes).toHaveBeenCalledWith(mockRecipes);
  });
});
