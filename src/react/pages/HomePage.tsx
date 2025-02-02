// React
import { useContext } from 'react';

// Context
import { AuthContext } from '../context/AuthContext.tsx';

// Components
import Login from '../components/Login.tsx';
import Recipes from '../components/Recipes.tsx';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('HomePage must be used within an AuthProvider');
  }

  const { user } = auth;

  return (
    <main className="hero">
      <h1 className="hero__title">sm<span className="just-a">a</span>rtfridge</h1>
      {user ? (
        <section className="hero__recipes">
          {/*<p>*/}
          {/*  Bonjour {user.name} {user.email}*/}
          {/*</p>*/}
          <Link
            to={'/login'}
            onClick={() => {
              auth.logout();
            }}
            className="log log-button-white"
          >
            O
            {/*Icone pour se déconnecter*/}
          </Link>
          {/*<Fridge />*/}
          {/*<Recipes />*/}
          {/*<ShoppingList />*/}
        </section>
      ) : (
        <Login />
      )}
    </main>
  );
}
