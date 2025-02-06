// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// Hooks & Effects
import { useState } from 'react';

// Jest
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Components
import TagsList from '../../react/components/TagsList.tsx';

describe('Lorsque qu`utilisateur veut filtrer les recettes par tag', () => {
  const availableTags = ['végétarien', 'déjeuner', 'dessert'];
  let selectedTags: string[] = [];
  const onTagSelect = jest.fn((updatedTags) => (selectedTags = updatedTags));

  beforeEach(() => {
    localStorage.clear();
    selectedTags = [];
  });

  test('Affiche le bouton "Recherche par tag" au chargement de la page', () => {
    render(
      <TagsList
        availableTags={availableTags}
        selectedTags={selectedTags}
        onTagSelect={onTagSelect}
      />
    );
    expect(screen.getByText('Recherche par tag')).toBeInTheDocument();
  });

  test('Ouvre et ferme la liste des tags en cliquant sur le conteneur', () => {
    render(
      <TagsList
        availableTags={availableTags}
        selectedTags={selectedTags}
        onTagSelect={onTagSelect}
      />
    );

    // Vérifie que la liste des tags est fermée au départ
    expect(screen.queryByRole('list')).not.toBeInTheDocument();

    // Simule un clic sur le container pour ouvrir la liste des tags
    fireEvent.click(screen.getByText('Recherche par tag'));

    // Vérifie que la liste des tags s'affiche
    expect(screen.getByRole('list')).toBeInTheDocument();

    // Simule un second clic pour fermer la liste
    fireEvent.click(screen.getByText('Recherche par tag'));

    // Vérifie que la liste a disparu
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('Sélectionne un tag en cliquant dessus', async () => {
    const TestWrapper = () => {
      const [selectedTags, setSelectedTags] = useState<string[]>([]);
      return (
        <TagsList
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagSelect={setSelectedTags}
        />
      );
    };

    render(
      <MemoryRouter>
        <TestWrapper />
      </MemoryRouter>
    );
    // Simule un clic sur le bouton "Recherche par tag"
    fireEvent.click(screen.getByText('Recherche par tag'));

    fireEvent.click(screen.getByText('végétarien'));

    await waitFor(() => {
      expect(screen.getByTestId('selected-tag-végétarien')).toBeInTheDocument();
    });
  });

  test('Désélectionne un tag en cliquant dessus', () => {
    selectedTags = ['végétarien'];
    render(
      <TagsList
        availableTags={availableTags}
        selectedTags={selectedTags}
        onTagSelect={onTagSelect}
      />
    );

    // Vérifier que le tag sélectionné est affiché
    expect(screen.getByText('végétarien')).toBeInTheDocument();

    // Désélectionner le tag
    fireEvent.click(screen.getByText('végétarien'));

    // Vérifier que la fonction onTagSelect a été appelée avec un tableau vide
    expect(onTagSelect).toHaveBeenCalledWith([]);
  });

  test('Stocke les tags sélectionnés dans localStorage', () => {
    render(
      <TagsList
        availableTags={availableTags}
        selectedTags={selectedTags}
        onTagSelect={onTagSelect}
      />
    );

    // Ouvrir la liste des tags
    fireEvent.click(screen.getByText('Recherche par tag'));

    // Sélectionner un tag
    fireEvent.click(screen.getByText('dessert'));

    // Vérifier que localStorage a bien stocké la valeur
    expect(localStorage.getItem('selectedTags')).toBe(JSON.stringify(['dessert']));
  });
});
