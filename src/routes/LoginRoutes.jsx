import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import AuthLogout from 'pages/authentication/auth-forms/AuthLogout';
import AuthResetPassword from 'pages/authentication/resetPassword';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthRegister />
    },
    {
      path: '/logout',
      element: <AuthLogout />
    }, 
    {
      path: '/reset-password',
      element: <AuthResetPassword />
    }
  ]
};

export default LoginRoutes;
