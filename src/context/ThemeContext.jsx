import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('sms_theme');
    if (stored) return stored === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('sms_sidebar_collapsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sms_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('sms_sidebar_collapsed', sidebarCollapsed);
  }, [sidebarCollapsed]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  const value = {
    isDarkMode,
    sidebarCollapsed,
    toggleTheme,
    toggleSidebar,
    setSidebarCollapsed,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
