// React
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import { AuthContext } from '../context/AuthContext.tsx';

// Components
import RecipesChoice from '../components/common/RecipesChoice.tsx';

// Content
import userImage from '../../assets/img/userfemale.webp';
import recipeImage from '../../assets/img/recipes/omelette japonaise (Tamagoyaki).webp';

export default function HomePage() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('HomePage must be used within an AuthProvider');
  }
  const { user } = auth;

  return (
    <main className="hero">
      {/*<h1 className="hero__title">*/}
      {/*  sm<span className="just-a">a</span>rtfridge*/}
      {/*</h1>*/}
      {user ? (
        <>
          <section className="hero__mainrecipe">
            {/*recette en fonction des ingrédients du frigo*/}
            <div className="hero__mainrecipe__show">
              <p className="hero__mainrecipe__show__text">
                Qu'est ce qu'on mange ?
              </p>
              <div className="hero__mainrecipe__show__container">
                <img
                  src={recipeImage}
                  className="hero__mainrecipe__show__container__img"
                  alt="photo de la recette proposée"
                />
              </div>
              <p className="hero__mainrecipe__show__title">Tamagoyaki</p>
            </div>
          </section>
          <RecipesChoice />
          <Link to={'/fridge'} className="hero__log">
            <div className="hero__log__user">
              <img
                src={userImage}
                className="hero__log__user__img"
                alt="image de l'utilisateur connecté"
              />
            </div>
          </Link>
        </>
      ) : (
        <>
          <section className="hero__mainrecipe">
            {/*recette aléatoire*/}
          </section>
          <div className="hero__log">
            <Link to={'/login'} className="hero__log__user">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="hero__log__user__login size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
