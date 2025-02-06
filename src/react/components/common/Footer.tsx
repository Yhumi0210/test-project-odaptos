// @ts-expect-error TS6133: React is declared but its value is never read. I need to use it for Jest
// React & React-Router-DOM
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        sm<span className="just-a">a</span>rtfridge
      </p>
      <p className="footer__text">© 2025 Laura BUIL</p>
    </footer>
  );
}
