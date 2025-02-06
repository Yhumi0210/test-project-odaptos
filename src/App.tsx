// React & React-Router-DOM
import { Outlet } from 'react-router-dom';

// Components
import Header from './react/components/common/Header.tsx';
import Footer from './react/components/common/Footer.tsx';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
