import { useState } from 'react';
import { useTheme } from '../../theme/ThemeEngine';
import { FiSave, FiTrash2, FiDownload, FiUpload } from 'react-icons/fi';

export default function ThemePresetManager() {
  const { themeConfig, setActiveTheme } = useTheme();
  const [presetName, setPresetName] = useState('');

  const saveAsPreset = async () => {
    try {
      const preset = {
        name: presetName,
        config: themeConfig,
        timestamp: new Date().toISOString()
      };
      
      await fetch('/api/themes/presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preset)
      });
      
      setPresetName('');
    } catch (error) {
      console.error('Failed to save preset:', error);
    }
  };

  const exportTheme = () => {
    const dataStr = JSON.stringify(themeConfig, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `theme-${themeConfig.name}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importTheme = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const content = await file.text();
      const theme = JSON.parse(content);
      setActiveTheme(theme);
    } catch (error) {
      console.error('Failed to import theme:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Theme Presets</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="Preset name"
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={saveAsPreset}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded"
          >
            <FiSave size={16} />
            <span>Save</span>
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={exportTheme}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded"
          >
            <FiDownload size={16} />
            <span>Export</span>
          </button>

          <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded cursor-pointer">
            <FiUpload size={16} />
            <span>Import</span>
            <input
              type="file"
              accept=".json"
              onChange={importTheme}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}