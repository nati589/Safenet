import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types'; // Add this import

import { REGISTER, LOGIN, LOGOUT, REFRESH } from './actions';

// initial state
const initialState = {
  // isLoggedIn: false,
  // isInitialized: false,
  user: null,
  loading: true
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        // isLoggedIn: true,
        user,
        loading: false
      };
    }
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        // isLoggedIn: true,
        // isInitialized: true,
        user,
        loading: false
      };
    }
    case REFRESH: {
      const { user } = action.payload;
      return {
        ...state,
        // isLoggedIn: true,
        // isInitialized: true,
        user,
        loading: false
      };
    }
    case 'LOADING': {
      const { loading } = action.payload;
      return {
        ...state,
        loading
      };
    }
    case LOGOUT: {
      return {
        ...state,
        // isInitialized: true,
        user: null
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const AuthContext = createContext();

// 'children' is missing in props validation
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth, initialState);

  useEffect(() => {
    dispatch({ type: 'LOADING', payload: { loading: true } });
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: LOGIN, payload: { user } });
    } else {
      dispatch({ type: LOGOUT });
    }
    dispatch({ type: 'LOADING', payload: { loading: false } });
  }, []);

  console.log('Auth State: ', state);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired // Add this prop validation
};
