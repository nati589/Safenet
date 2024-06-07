import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { REGISTER } from 'contexts/actions';
import { postData } from 'api/api';
import { jwtDecode } from 'jwt-decode';

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const handleSignUp = async (firstName, lastName, email, password) => {
    setLoading(true);
    setError(null);
    console.log(firstName, lastName, email, password);
    // Call the signup function here
    await postData('/auth/register', { firstName, lastName, email, password }, false)
      .then((response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(jwtDecode(response.accessToken)));
        dispatch({ type: REGISTER, payload: { user: jwtDecode(response.accessToken) } });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        throw new Error(error.message || 'Something went wrong!');
      });

    setLoading(false);
  };
  return { loading, error, handleSignUp };
};
