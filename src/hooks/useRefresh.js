import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext'; // Replace with the actual path to your AuthContext
import { REFRESH } from 'contexts/actions';
import { postData } from 'api/api';

const useRefreshToken = () => {
  const { dispatch } = useContext(AuthContext);

  const refreshToken = async () => {
    // Refresh token logic here
    // ...
    try {
      const response = await postData('/auth/refresh', {}, false);
      console.log(response);
      localStorage.setItem('token', response.accessToken);
      dispatch({ type: REFRESH, payload: { user: response.accessToken } });
      return accessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
    // Dispatch a refresh action to your AuthContext
  };

  return refreshToken;
};

export default useRefreshToken;
