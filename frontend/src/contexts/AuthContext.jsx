import { createContext, useEffect, useMemo, useState } from 'react';
import { getToken, setToken, getProfile } from '../services/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(getToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const currentToken = getToken();
      if (currentToken) {
        try {
          const { user } = await getProfile();
          setUser(user);
        } catch (err) {
          console.error('Unable to fetch profile', err);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initialize();
  }, []);

  const login = (newToken) => {
    setToken(newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    setToken(null);
    setTokenState(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      setUser,
      login,
      logout,
      loading,
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
