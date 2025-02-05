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
