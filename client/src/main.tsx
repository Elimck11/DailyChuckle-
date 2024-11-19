import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
// import SingleJoke from './pages/SingleJoke.js'; 
// import Profile from './pages/Profile';
import Jokes from './pages/Jokes.js'
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/jokes',
        element: <Jokes />
      }
      // {
      //   path: '/profiles/:username',
      //   element: <Profile />
      // },
      // {
      //   path: '/me',
      //   element: <Profile />

      // }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
