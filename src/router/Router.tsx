import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { NotFoundPage, SearchPage } from '../pages';
import { LoginPage } from '../pages/login/LoginPage';
import { routes } from '../constants';

const router = createBrowserRouter([
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: routes.search_page,
    element: <SearchPage />,
  },
  {
    path: routes.not_found,
    element: <NotFoundPage />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
