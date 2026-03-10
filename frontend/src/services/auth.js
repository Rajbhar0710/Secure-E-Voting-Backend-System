import api, { setAuthToken } from './api';

const TOKEN_STORAGE_KEY = 'evoting_token';

export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setAuthToken(token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setAuthToken(null);
  }
};

export const logout = () => {
  setToken(null);
};

export const login = async ({ aadharCardNumber, password }) => {
  const response = await api.post('/user/login', { aadharCardNumber, password });
  const token = response?.data?.token;
  if (token) {
    setToken(token);
  }
  return response.data;
};

export const signup = async (payload) => {
  const response = await api.post('/user/signup', payload);
  const token = response?.data?.token;
  if (token) {
    setToken(token);
  }
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};
