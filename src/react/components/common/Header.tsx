// React
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Context
import { AuthContext } from '../../context/AuthContext.tsx';

// Components

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('HomePage must be used within an AuthProvider');
  }

  const { user } = auth;

  const handleMenuToggle = () => {
    setIsAnimating(true);
    setMenuOpen(!menuOpen);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true; // Page d'accueil
    if (path !== '/' && location.pathname.includes(path)) return true; // Autres pages avec ID
    return false;
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="menu size-6"
        onClick={handleMenuToggle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <header
        className={`header ${menuOpen ? 'is-open' : isAnimating ? 'is-closed' : ''}`}
        onAnimationEnd={handleAnimationEnd}
      >
        {/*<svg*/}
        {/*  xmlns="http://www.w3.org/2000/svg"*/}
        {/*  fill="none"*/}
        {/*  viewBox="0 0 24 24"*/}
        {/*  strokeWidth={1.5}*/}
        {/*  stroke="currentColor"*/}
        {/*  className="menu-toggle size-6"*/}
        {/*  onClick={handleMenuToggle}*/}
        {/*>*/}
        {/*  <path*/}
        {/*    strokeLinecap="round"*/}
        {/*    strokeLinejoin="round"*/}
        {/*    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"*/}
        {/*  />*/}
        {/*</svg>*/}
        <Link to={''} className="header__brand">
          sm<span className="just-a">a</span>rtfridge
        </Link>
        <nav className="header__nav">
          <Link
            to={'/'}
            className={`header__nav__link ${isActive('/') ? 'active' : ''}`}
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            Recettes
          </Link>
          <Link
            to={'/fridge'}
            className={`header__nav__link ${isActive('/fridge') ? 'active' : ''}`}
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            Mon frigo
          </Link>
          <Link
            to={'/shopping-list'}
            className={`header__nav__link ${isActive('/shopping-list') ? 'active' : ''}`}
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            M<span className="just-a">a</span> liste de courses
          </Link>
          {user ? (
            <div className="log">
              <Link
                to={'/login'}
                onClick={() => {
                  auth.logout();
                  setMenuOpen(false);
                }}
                className="log-button-white"
              >
                Se déconnecter
              </Link>
            </div>
          ) : (
            <Link
              to={'/login'}
              onClick={() => {
                setMenuOpen(false);
              }}
              className="log-button-white"
            >
              Se connecter
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
