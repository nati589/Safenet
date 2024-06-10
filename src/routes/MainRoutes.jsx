import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ProtectedRoute from 'pages/authentication/ProtectedRoute';
import UserList from 'pages/component-overview/UserList';
import AddUser from 'pages/component-overview/AddUser';
// import { useAuthContext } from 'hooks/useAuthContext';
import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from 'hooks/useAuthContext';

const Blacklist = Loadable(lazy(() => import('pages/component-overview/blacklist')));
const History = Loadable(lazy(() => import('pages/component-overview/history')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Profile = Loadable(lazy(() => import('pages/component-overview/profile')));

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { state } = useAuthContext();
  return allowedRoles.includes(state.user.role) ? children : <Navigate to="/dashboard/default" />;
};

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
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'history',
      element: <History />
    },
    {
      path: 'userlist',
      element: (
        <RoleBasedRoute allowedRoles={['admin']}>
          <Outlet />
        </RoleBasedRoute>
        // <RoleBasedRoute allowedRoles={['admin']} />
      ),
      // element: <UserList />
      children: [
        {
          path: '',
          element: <UserList />
        },
        {
          path: 'adduser',
          element: <AddUser />
        }
      ]
    },
    {
      path: 'profile',
      element: <Profile />
    }
  ]
};

export default MainRoutes;
