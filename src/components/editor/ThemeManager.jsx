import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiSmartphone, FiMonitor } from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeManager() {
  const { theme, updateTheme } = useTheme();
  const [activeDevice, setActiveDevice] = useState('mobile');
  const [themeMode, setThemeMode] = useState('light');

  const handleColorChange = (property, value) => {
    updateTheme({
      ...theme,
      [activeDevice]: {
        ...theme[activeDevice],
        colors: {
          ...theme[activeDevice].colors,
          [property]: value
        }
      }
    });
  };

  const handleSpacingChange = (property, value) => {
    updateTheme({
      ...theme,
      [activeDevice]: {
        ...theme[activeDevice],
        spacing: {
          ...theme[activeDevice].spacing,
          [property]: value
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Theme Settings</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveDevice('mobile')}
            className={`p-2 rounded ${activeDevice === 'mobile' ? 'bg-primary-100 text-primary-600' : ''}`}
          >
            <FiSmartphone />
          </button>
          <button
            onClick={() => setActiveDevice('desktop')}
            className={`p-2 rounded ${activeDevice === 'desktop' ? 'bg-primary-100 text-primary-600' : ''}`}
          >
            <FiMonitor />
          </button>
          <button
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
            className="p-2 rounded"
          >
            {themeMode === 'light' ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Colors */}
        <section>
          <h3 className="text-sm font-medium mb-3">Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Primary</label>
              <input
                type="color"
                value={theme[activeDevice].colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-full h-10 rounded border"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Secondary</label>
              <input
                type="color"
                value={theme[activeDevice].colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-full h-10 rounded border"
              />
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h3 className="text-sm font-medium mb-3">Spacing</h3>
          <div className="space-y-3">
            {['sm', 'md', 'lg', 'xl'].map((size) => (
              <div key={size}>
                <label className="text-sm text-gray-600">{size.toUpperCase()}</label>
                <input
                  type="range"
                  min="0"
                  max="64"
                  value={theme[activeDevice].spacing[size]}
                  onChange={(e) => handleSpacingChange(size, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h3 className="text-sm font-medium mb-3">Typography</h3>
          <div className="space-y-3">
            <select 
              className="w-full p-2 border rounded"
              value={theme[activeDevice].typography.fontFamily}
              onChange={(e) => updateTheme({
                ...theme,
                [activeDevice]: {
                  ...theme[activeDevice],
                  typography: {
                    ...theme[activeDevice].typography,
                    fontFamily: e.target.value
                  }
                }
              })}
            >
              <option value="sans">Sans</option>
              <option value="serif">Serif</option>
              <option value="mono">Mono</option>
            </select>
          </div>
        </section>
      </div>
    </div>
  );
}