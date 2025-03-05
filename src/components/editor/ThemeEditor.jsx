import { useState } from 'react';
import { useTheme } from '../../theme/ThemeEngine';
import ColorPicker from '../ui/ColorPicker';
import FontSelector from '../ui/FontSelector';

export default function ThemeEditor() {
  const { themeConfig, updateThemeVariable } = useTheme();
  const [activeSection, setActiveSection] = useState('colors');

  const sections = {
    colors: [
      { key: 'primary-color', label: 'Primary Color' },
      { key: 'secondary-color', label: 'Secondary Color' },
      { key: 'text-color', label: 'Text Color' },
      { key: 'background-color', label: 'Background Color' }
    ],
    typography: [
      { key: 'font-primary', label: 'Primary Font' },
      { key: 'font-secondary', label: 'Secondary Font' },
      { key: 'font-size-base', label: 'Base Font Size' }
    ],
    spacing: [
      { key: 'spacing-unit', label: 'Spacing Unit' },
      { key: 'container-width', label: 'Container Width' }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex space-x-4 mb-6">
        {Object.keys(sections).map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded ${
              activeSection === section 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {sections[activeSection].map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <label className="text-sm font-medium">{label}</label>
            {activeSection === 'colors' ? (
              <ColorPicker
                value={themeConfig.variables?.[key]}
                onChange={(color) => updateThemeVariable(key, color)}
              />
            ) : activeSection === 'typography' ? (
              <FontSelector
                value={themeConfig.variables?.[key]}
                onChange={(font) => updateThemeVariable(key, font)}
              />
            ) : (
              <input
                type="text"
                value={themeConfig.variables?.[key]}
                onChange={(e) => updateThemeVariable(key, e.target.value)}
                className="border rounded px-3 py-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}