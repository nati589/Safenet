import { useAuthContext } from './useAuthContext';
import { LOGOUT } from 'contexts/actions';
import { postData } from 'api/api';

export const useLogout = () => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const handleLogout = async () => {
    await postData('/auth/logout', {})
      .then(() => {
        dispatch({ type: LOGOUT });
        localStorage.removeItem('user');
      })
      .catch((error) => {
        console.log(error);
        // setError(error.message);
        throw new Error(error.message || 'Something went wrong!');
      });
  };

  return { handleLogout };
};
