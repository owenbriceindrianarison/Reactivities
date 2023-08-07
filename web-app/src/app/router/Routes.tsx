import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../layout/App';
import { ActivityDashboard } from '../../features/activities/presenter/ActivityDashboard';
import { ActivityForm } from '../../features/activities/presenter/form/ActivityForm';
import { ActivityDetails } from '../../features/activities/presenter/ActivityDetails';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'activities',
        element: <ActivityDashboard />,
      },
      {
        path: 'activities/:id',
        element: <ActivityDetails />,
      },
      {
        path: 'create-activity',
        element: <ActivityForm key='create' />,
      },
      {
        path: 'manage/:id',
        element: <ActivityForm key='manage' />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
