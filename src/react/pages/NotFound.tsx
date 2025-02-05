// Hooks & Effects
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="notFound">
      <h1 className="notFound__title">
        <span className="just-a">404</span>
        <br />
        Not Found
      </h1>
      <Link to={'/'} className="tags notFound__link">
        Accueil
      </Link>
    </section>
  );
}
