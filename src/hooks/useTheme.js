import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultTheme = {
  mobile: {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    spacing: {
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24
    },
    typography: {
      fontFamily: 'sans',
      scale: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem'
      }
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  },
  desktop: {
    // Desktop-specific theme values
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    spacing: {
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32
    },
    typography: {
      fontFamily: 'sans',
      scale: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem'
      }
    }
  }
};

export const useTheme = create(
  persist(
    (set) => ({
      theme: defaultTheme,
      updateTheme: (newTheme) => set({ theme: newTheme }),
      resetTheme: () => set({ theme: defaultTheme }),
      
      // Generate CSS variables
      generateCSSVariables: () => {
        const theme = useTheme.getState().theme;
        let cssVars = '';
        
        ['mobile', 'desktop'].forEach(device => {
          Object.entries(theme[device].colors).forEach(([key, value]) => {
            cssVars += `--${device}-color-${key}: ${value};\n`;
          });
          
          Object.entries(theme[device].spacing).forEach(([key, value]) => {
            cssVars += `--${device}-spacing-${key}: ${value}px;\n`;
          });
        });
        
        return cssVars;
      }
    }),
    {
      name: 'theme-storage',
      getStorage: () => localStorage
    }
  )
);