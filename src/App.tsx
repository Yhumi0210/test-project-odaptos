// React
import { Outlet } from 'react-router-dom';

// Components
import Header from './react/components/common/Header.tsx';
import Footer from './react/components/common/Footer.tsx';
// import ScrollToSection from './components/ScrollToSection'

export default function App() {
  return (
    <>
      {/*<ScrollToSection/>*/}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
