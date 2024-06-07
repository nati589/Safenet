import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ProtectedRoute from 'pages/authentication/ProtectedRoute';

const Blacklist = Loadable(lazy(() => import('pages/component-overview/blacklist')));
const History = Loadable(lazy(() => import('pages/component-overview/history')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Profile = Loadable(lazy(() => import('pages/component-overview/profile')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'blacklist',
      element: <Blacklist />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'history',
      element: <History />
    },
    {
      path: 'profile',
      element: <Profile />
    }
  ]
};

export default MainRoutes;
