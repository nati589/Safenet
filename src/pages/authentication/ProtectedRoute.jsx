import { Navigate } from 'react-router-dom';
import { useAuthContext } from 'hooks/useAuthContext';
import { useEffect } from 'react';
import { getData } from 'api/api';
import ComponentSkeleton from 'pages/component-overview/ComponentSkeleton';

export default function ProtectedRoute({ children }) {
  const { state } = useAuthContext();

  useEffect(() => {
    // if (!state.user) {
    // Redirect to login page
    // window.location.href = '/login';
    // }
    const checkRoute = async () => {
      try {
        // Your API call here
        const response = await getData('/auth/protected', {});
        // const data = await response.json();
        if (response.ok) {
          dispatch({ type: LOGIN, payload: { user: data.user } });
        } else {
          dispatch({ type: LOGOUT });
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkRoute();
  }, []);

  if (state.loading) {
    return <ComponentSkeleton></ComponentSkeleton>; // Replace with your actual loading component
  }

  return state.user ? children : <Navigate to="/login" />;
}
