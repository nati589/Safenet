import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { LOGIN } from 'contexts/actions';
import { postData } from 'api/api';
import { jwtDecode } from 'jwt-decode';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);

    // Call the function here
    await postData('/auth/login', { email, password }, false)
      .then((response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(jwtDecode(response.accessToken)));
        // console.log(jwtDecode(response.accessToken));
        dispatch({ type: LOGIN, payload: { user: jwtDecode(response.accessToken) } });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        // setError(error?.response?.data?.message);
        setLoading(false);
        throw new Error(error?.response?.data?.message || 'Something went wrong!');
      });
  };
  return { loading, error, handleLogin };
};
