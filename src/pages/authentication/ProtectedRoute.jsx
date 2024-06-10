import { Navigate } from 'react-router-dom';
import { useAuthContext } from 'hooks/useAuthContext';
// import { useEffect } from 'react';
// import { getData } from 'api/api';
import ComponentSkeleton from 'pages/component-overview/ComponentSkeleton';
import { LOGOUT } from 'contexts/actions';
// import { LOGOUT } from 'contexts/actions';

export default function ProtectedRoute({ children }) {
  const { state, dispatch } = useAuthContext();
  
  if (state.loading) {
    return <ComponentSkeleton></ComponentSkeleton>;
  }
  if (state.user) {
    return children;
  } else {
    dispatch({ type: LOGOUT, payload: { user: null } });
    return <Navigate to="/login" />;
  }
  // return state.user ? children : <Navigate to="/login" />;
}

    // const navigate = useNavigate();
  
    // useEffect(() => {
    //   // if (!state.user) {
    //   // Redirect to login page
    //   // window.location.href = '/login';
    //   // }
    //   const checkRoute = async () => {
    //     await getData('/auth/protected', {})
    //       .then((res) => {
    //         console.log(res);
    //         // if (!state?.user) {
    //         //   dispatch({ type: LOGIN, payload: { user: data.user } });
    //         // }
    //         // return res;
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //         dispatch({ type: LOGOUT });
    //         navigate('/login');
    //         // return error;
    //       });
    //   };
    //   checkRoute();
    // }, []);