// React
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Components

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

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
      <div className="title">
        <Link to={''} className="title__link">
          sm<span className="just-a">a</span>rtfridge
        </Link>
      </div>
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
        </nav>
      </header>
    </>
  );
}
