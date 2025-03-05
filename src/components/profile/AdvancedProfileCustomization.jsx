import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiImage, FiSettings, FiLayout } from 'react-icons/fi';
import { HexColorPicker } from 'react-colorful';

export default function AdvancedProfileCustomization() {
  const [customization, setCustomization] = useState({
    theme: {
      primary: '#3B82F6',
      secondary: '#1F2937',
      accent: '#10B981'
    },
    layout: 'default',
    visibility: {
      email: true,
      phone: false,
      activity: true,
      earnings: false
    },
    preferences: {
      notifications: true,
      newsletter: false,
      updates: true
    }
  });

  const [activeColor, setActiveColor] = useState(null);

  const handleColorChange = (color) => {
    setCustomization(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        [activeColor]: color
      }
    }));
  };

  const layouts = ['default', 'compact', 'expanded', 'minimal'];

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <FiSettings className="mr-2" /> Profile Customization
        </h2>

        {/* Theme Customization */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Theme Colors</h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(customization.theme).map(([key, color]) => (
              <div key={key} className="text-center">
                <button
                  className="w-12 h-12 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  style={{ backgroundColor: color }}
                  onClick={() => setActiveColor(key)}
                />
                <p className="mt-2 text-sm capitalize">{key}</p>
              </div>
            ))}
          </div>
          
          {activeColor && (
            <div className="mt-4">
              <HexColorPicker
                color={customization.theme[activeColor]}
                onChange={handleColorChange}
              />
            </div>
          )}
        </div>

        {/* Layout Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Layout Style</h3>
          <div className="grid grid-cols-2 gap-4">
            {layouts.map(layout => (
              <motion.button
                key={layout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 ${
                  customization.layout === layout
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
                onClick={() => setCustomization(prev => ({
                  ...prev,
                  layout
                }))}
              >
                <FiLayout className="mx-auto mb-2" />
                <span className="capitalize">{layout}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Visibility Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Privacy & Visibility</h3>
          <div className="space-y-4">
            {Object.entries(customization.visibility).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="capitalize">{key}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() => setCustomization(prev => ({
                      ...prev,
                      visibility: {
                        ...prev.visibility,
                        [key]: !prev.visibility[key]
                      }
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-lg font-medium mb-4">Preferences</h3>
          <div className="space-y-4">
            {Object.entries(customization.preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="capitalize">{key}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() => setCustomization(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        [key]: !prev.preferences[key]
                      }
                    }))}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}