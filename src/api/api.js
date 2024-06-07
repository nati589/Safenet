import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// import { useAuthContext } from 'hooks/useAuthContext';
// import { useContext } from 'react';

// Create an instance of axios

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api', // Replace with your API base URL
  //   timeout: 1000, // Optional timeout setting
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // Include cookies in requests
});

// Function to set the JWT token
const setAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    // Apply authorization token to every request if logged in
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Function to perform a GET request
const getData = async (endpoint, requiresAuth = true) => {
  try {
    if (requiresAuth) setAuthToken();
    const response = await apiClient.get(endpoint);
    console.log('GET Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during GET request:', error);
    throw error;
  }
};

// Function to perform a POST request
const postData = async (endpoint, data, requiresAuth = true) => {
  try {
    if (requiresAuth) setAuthToken();
    const response = await apiClient.post(endpoint, data);
    console.log('POST Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during POST request:', error);
    throw error;
  }
};

// Function to refresh the access token
const refreshAccessToken = async () => {
  // const { dispatch } = useContext();
  try {
    const response = await postData('/auth/refresh', {}, false);
    console.log(response);
    localStorage.setItem('user', JSON.stringify(jwtDecode(response.accessToken)));
    console.log(jwtDecode(response.accessToken));
    return response.accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// Axios response interceptor to handle 401 errors and refresh token
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log('yay', error);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        return apiClient(originalRequest);
      } catch (refreshError) {
        if (refreshError.response && refreshError.response.status === 403) {
          // Handle logout logic, e.g., redirect to login page
          window.location.href = '/login';
        }
        console.error('Error during token refresh:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient, setAuthToken, getData, postData };
