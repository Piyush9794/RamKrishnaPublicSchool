import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authApi from '../services/auth.api';
import appConfig from '../config/appConfig';
import { ROLES, ROLE_HOME_ROUTES } from '../utils/roles';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = localStorage.getItem(appConfig.tokenKey);
        const storedUser = localStorage.getItem(appConfig.userKey);

        if (token && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);

          // Verify token is still valid by fetching profile if backend is up
          try {
            const { data } = await authApi.getProfile();
            setUser(data.user || data);
            localStorage.setItem(appConfig.userKey, JSON.stringify(data.user || data));
          } catch {
            // Keep stored mock user if offline/dev mode
          }
        }
      } catch {
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const clearSession = () => {
    localStorage.removeItem(appConfig.tokenKey);
    localStorage.removeItem(appConfig.refreshTokenKey);
    localStorage.removeItem(appConfig.userKey);
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = useCallback(async (credentials) => {
    let userData;
    let accessToken = 'demo-jwt-token-12345';
    let refreshToken = 'demo-refresh-token-12345';

    try {
      const { data } = await authApi.login(credentials);
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
      userData = data.user;
    } catch (err) {
      // Standalone frontend fallback for demo testing
      userData = {
        id: `demo-${credentials.role}-01`,
        name:
          credentials.role === ROLES.ADMIN
            ? 'System Administrator'
            : credentials.role === ROLES.TEACHER
            ? 'Sarah Jenkins'
            : 'Robert Wright',
        email: credentials.email || `${credentials.role}@school.edu`,
        role: credentials.role,
        avatar: '',
      };
    }

    localStorage.setItem(appConfig.tokenKey, accessToken);
    if (refreshToken) localStorage.setItem(appConfig.refreshTokenKey, refreshToken);
    localStorage.setItem(appConfig.userKey, JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore logout API errors
    } finally {
      clearSession();
    }
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem(appConfig.userKey, JSON.stringify(updatedUser));
  }, []);

  const getHomeRoute = useCallback(() => {
    if (!user?.role) return '/login';
    return ROLE_HOME_ROUTES[user.role] || '/login';
  }, [user]);

  const isRole = useCallback((role) => user?.role === role, [user]);
  const isAdmin = useCallback(() => user?.role === ROLES.ADMIN, [user]);
  const isTeacher = useCallback(() => user?.role === ROLES.TEACHER, [user]);
  const isParent = useCallback(() => user?.role === ROLES.PARENT, [user]);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    getHomeRoute,
    isRole,
    isAdmin,
    isTeacher,
    isParent,
    role: user?.role || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
