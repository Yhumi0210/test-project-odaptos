// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// SCSS
import './assets/scss/main.scss';

// Pages
import App from './App.tsx';

// Children
import HomePage from './react/pages/HomePage.tsx';
import NotFound from './react/components/common/NotFound.tsx';
import FullRecipe from './react/components/common/FullRecipe.tsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/recipe/:id',
        element: <FullRecipe />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
