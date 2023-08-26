import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import App from '../App';
import ActivityDashboardPage from '../pages/dashboard/ActivityDashboardPage';
import ActivityFormPage from '../pages/create-edit/ActivityFormPage';
import ActivityDetailPage from '../pages/details/ActivityDetailsPage';
// import { TestErrors } from '../components/errors/TestErrors';
import { NotFound } from '../components/errors/NotFound';
import { ServerError } from '../components/errors/ServerError';
import ProfilePage from '../pages/profile/ProfilePage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'activities',
        element: <ActivityDashboardPage />,
      },
      {
        path: 'activities/:id',
        element: <ActivityDetailPage />,
      },
      {
        path: 'create-activity',
        element: <ActivityFormPage key='create' />,
      },
      {
        path: 'manage/:id',
        element: <ActivityFormPage key='manage' />,
      },
      {
        path: 'profiles/:username',
        element: <ProfilePage />,
      },
      // {
      //   path: 'errors',
      //   element: <TestErrors />,
      // },
      {
        path: 'not-found',
        element: <NotFound />,
      },
      {
        path: 'server-error',
        element: <ServerError />,
      },
      {
        path: '*',
        element: <Navigate replace to='not-found' />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
