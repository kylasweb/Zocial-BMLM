import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { premiumThemes } from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useLocalStorage('site-theme', 'crystal');
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false);
  const [themeConfig, setThemeConfig] = useState({});

  useEffect(() => {
    const theme = premiumThemes[activeTheme];
    if (theme) {
      const config = {
        ...theme,
        darkMode,
        variables: {
          ...theme.colors,
          ...(darkMode ? theme.darkMode : {}),
        }
      };
      setThemeConfig(config);
      applyTheme(config);
    }
  }, [activeTheme, darkMode]);

  const applyTheme = (config) => {
    const root = document.documentElement;
    Object.entries(config.variables || {}).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--${key}-${subKey}`, subValue);
        });
      } else {
        root.style.setProperty(`--${key}`, value);
      }
    });
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{
      activeTheme,
      setActiveTheme,
      themeConfig,
      darkMode,
      toggleDarkMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
