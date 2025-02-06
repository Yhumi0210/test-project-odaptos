// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';

// Components
import RecipesDisplay from '../components/RecipesDisplay.tsx';

export default function HomePage() {
  return (
    <main className="hero">
      <h1 className="hero__title">Qu'est ce qu'on mange ?</h1>
      <RecipesDisplay />
    </main>
  );
}
