// React
import { useContext } from 'react';

// Context
import { AuthContext } from '../context/AuthContext.tsx';

// Components
import Login from '../components/Login.tsx';
import Fridge from '../components/Fridge.tsx';
import Recipes from '../components/Recipes.tsx';

export default function HomePage() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('HomePage must be used within an AuthProvider');
  }

  const { user } = auth;

  return (
    <div>
      <h1>HomePage</h1>
      {user ? (
        <div>
          <p>
            Bonjour {user.name} {user.email}
          </p>
          <button onClick={() => auth.logout()}>Déconnexion</button>
          <Fridge />
          <Recipes />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
