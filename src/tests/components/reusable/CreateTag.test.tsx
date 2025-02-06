// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';

// Jest
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import CreateTag from '../../../react/components/reusable/CreateTag.tsx';

describe('Une balise est créée pour chaque tag cliqué', () => {
  test('appelle onClick avec le bon tag lorsqu`on clique dessus', () => {
    const mockOnClick = jest.fn();
    render(<CreateTag tag="Végétarien" onClick={mockOnClick} />);

    const tagElement = screen.getByText(/Végétarien/i);
    // Simule un clic sur le tag Végétarien
    fireEvent.click(tagElement);

    // Vérifie que la fonction onClick a été appelée avec le bon tag et qu'elle a été appelée une fois
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('Végétarien');
  });
});
