// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Hooks & Effects
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsAnimating(true);
    setMenuOpen(!menuOpen);
  };

  const endAnimation = () => {
    setIsAnimating(false);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.includes(path)) return true;
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
        onClick={toggleMenu}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
      <header
        className={`header ${menuOpen ? 'is-open' : isAnimating ? 'is-closed' : ''}`}
        onAnimationEnd={endAnimation}
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
