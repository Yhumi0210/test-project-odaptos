// React
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// SCSS
import './assets/scss/main.scss'

// Pages
import App from './App.tsx'

// Children
import HomePage from './react/pages/HomePage.tsx'
import NotFound from './react/components/common/NotFound.tsx'


const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: '*',
                element: <NotFound/>,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
