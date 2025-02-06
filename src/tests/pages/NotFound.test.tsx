// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// Jest
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Components
import NotFound from '../../react/pages/NotFound.tsx';

describe('Lorsqu`un utilisateur accède à une page inexistante', () => {
  test('affiche le message "Not Found"', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const notFoundTitle = screen.getByText(/404/i);
    expect(notFoundTitle).toBeInTheDocument();

    const notFoundLink = screen.getByText(/Accueil/i);
    expect(notFoundLink).toBeInTheDocument();
  });
});
