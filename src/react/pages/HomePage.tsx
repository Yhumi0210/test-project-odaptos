// React

// Components
import RecipesChoice from '../components/RecipesChoice.tsx';

export default function HomePage() {
  return (
    <main className="hero">
      <>
        <section className="hero__mainrecipe">
          <div className="hero__mainrecipe__show">
            <h1 className="hero__mainrecipe__show__text">
              Qu'est ce qu'on mange ?
            </h1>
          </div>
        </section>
        <RecipesChoice />
      </>
    </main>
  );
}
