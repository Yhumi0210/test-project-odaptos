// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';

// Jest
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Component
import SearchBar from '../../react/components/SearchBar.tsx';

describe('Lorsqu`un utilisateur veut chercher une recette ou un ingrédient', () => {
  let onSearchMock: jest.Mock;
  // Mock de la fonction onSearch
  beforeEach(() => {
    onSearchMock = jest.fn();
    localStorage.clear();
  });

  test('N`affiche pas le champ de recherche au départ', () => {
    render(<SearchBar onSearch={onSearchMock} searchedText="" />);
    expect(screen.queryByPlaceholderText('Recette ou ingrédient')).not.toBeInTheDocument();
  });

  test('Affiche le champ de recherche après un clic sur l`icône', () => {
    render(<SearchBar onSearch={onSearchMock} searchedText="" />);

    // Simule un clic sur l'icône de recherche
    fireEvent.click(screen.getByTestId('search-icon'));

    // Vérifie que le champ de recherche apparaît
    expect(screen.getByPlaceholderText('Recette ou ingrédient')).toBeInTheDocument();
  });

  test('Met à jour l`état et appelle `onSearch` lors de la saisie', () => {
    render(<SearchBar onSearch={onSearchMock} searchedText="" />);

    fireEvent.click(screen.getByTestId('search-icon'));

    // Récupére le champ de recherche et simuler une saisie
    const input = screen.getByPlaceholderText('Recette ou ingrédient');
    fireEvent.change(input, { target: { value: 'Salade' } });

    // Vérifie que la fonction onSearch est appelée avec le bon texte
    expect(onSearchMock).toHaveBeenCalledWith('Salade');
  });

  test('Stocke le texte de recherche dans localStorage', async () => {
    render(<SearchBar onSearch={onSearchMock} searchedText="Salade" />);

    // Simule un clic sur l'icône de recherche
    fireEvent.click(screen.getByTestId('search-icon'));
    const input = screen.getByPlaceholderText('Recette ou ingrédient');
    // Simule une saisie
    fireEvent.change(input, { target: { value: 'Salade' } });
    // Attends et vérifie que le texte soit stocké dans localStorage
    await waitFor(() => {
      expect(localStorage.getItem('searchText')).toBe('Salade');
    });
  });

  test('Si l`utilisateur reload sa page, charge et affiche la valeur stockée dans localStorage', () => {
    // Stocke le texte de recherche dans localStorage
    localStorage.setItem('searchText', 'Omelette');
    render(<SearchBar onSearch={onSearchMock} searchedText="Omelette" />);
    // Simule un clic sur l'icône de recherche
    fireEvent.click(screen.getByTestId('search-icon'));
    // Vérifie que le champ de recherche contient 'Omelette'
    expect(screen.getByPlaceholderText('Recette ou ingrédient')).toHaveValue('Omelette');
  });
});
