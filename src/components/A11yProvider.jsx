import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const A11yContext = createContext({});

export function A11yProvider({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Announce route changes
    const message = `Navigated to ${document.title}`;
    announceNavigation(message);
  }, [location]);

  const announceNavigation = (message) => {
    const announcer = document.getElementById('route-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  };

  const handleKeyboardNav = (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  };

  const handleMouseDown = () => {
    document.body.classList.remove('keyboard-nav');
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardNav);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyboardNav);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <A11yContext.Provider value={{}}>
      {children}
      <div
        id="route-announcer"
        role="alert"
        aria-live="polite"
        className="sr-only"
      />
    </A11yContext.Provider>
  );
}

export const useA11y = () => useContext(A11yContext);