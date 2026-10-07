import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('codearena_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (admin?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${admin.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [admin]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/v1/auth/admin/login', { email, password });
      const { access_token, user } = response.data;
      const adminData = { ...user, token: access_token };
      setAdmin(adminData);
      localStorage.setItem('codearena_admin', JSON.stringify(adminData));
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid administrator credentials');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('codearena_admin');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
