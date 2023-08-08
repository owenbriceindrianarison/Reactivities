import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../App';
import ActivityDashboardPage from '../pages/dashboard/ActivityDashboardPage';
import ActivityFormPage from '../pages/create-edit/ActivityFormPage';
import ActivityDetailPage from '../pages/details/ActivityDetailsPage';

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
    ],
  },
];

export const router = createBrowserRouter(routes);
