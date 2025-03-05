import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { 
  FiLayers, FiEdit, FiEye, FiSettings, FiSave,
  FiSmartphone, FiMonitor, FiTablet 
} from 'react-icons/fi';
import { useTheme } from '../../hooks/useTheme';

export default function MobileWebsiteEditor() {
  const [viewMode, setViewMode] = useState('mobile');
  const [activePanel, setActivePanel] = useState('editor');
  const [previewMode, setPreviewMode] = useState(false);
  const { theme, updateTheme } = useTheme();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setActivePanel('preview'),
    onSwipedRight: () => setActivePanel('editor'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleViewportChange = (mode) => {
    setViewMode(mode);
    // Trigger viewport-specific styles
    document.documentElement.setAttribute('data-viewport', mode);
  };

  const handleSave = async () => {
    try {
      // Save current changes
      await savePageChanges();
      // Show success feedback
      showToast('Changes saved successfully');
    } catch (error) {
      showToast('Error saving changes', 'error');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50" {...swipeHandlers}>
      {/* Top Toolbar */}
      <div className="safe-area-top bg-white border-b px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button 
              onClick={() => handleViewportChange('mobile')}
              className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-primary-100 text-primary-600' : ''}`}
            >
              <FiSmartphone />
            </button>
            <button 
              onClick={() => handleViewportChange('tablet')}
              className={`p-2 rounded ${viewMode === 'tablet' ? 'bg-primary-100 text-primary-600' : ''}`}
            >
              <FiTablet />
            </button>
            <button 
              onClick={() => handleViewportChange('desktop')}
              className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-primary-100 text-primary-600' : ''}`}
            >
              <FiMonitor />
            </button>
          </div>
          <button 
            onClick={handleSave}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FiSave className="mr-2" />
            Save
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, x: activePanel === 'editor' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activePanel === 'editor' ? 20 : -20 }}
            className="h-full"
          >
            {activePanel === 'editor' ? (
              <EditorPanel viewMode={viewMode} theme={theme} />
            ) : (
              <PreviewPanel viewMode={viewMode} theme={theme} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <nav className="safe-area-bottom bg-white border-t">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActivePanel('editor')}
            className={`flex flex-col items-center justify-center w-full h-full
              ${activePanel === 'editor' ? 'text-primary-600' : 'text-gray-500'}`}
          >
            <FiEdit className="text-xl mb-1" />
            <span className="text-xs">Editor</span>
          </button>
          <button
            onClick={() => setActivePanel('layers')}
            className={`flex flex-col items-center justify-center w-full h-full
              ${activePanel === 'layers' ? 'text-primary-600' : 'text-gray-500'}`}
          >
            <FiLayers className="text-xl mb-1" />
            <span className="text-xs">Layers</span>
          </button>
          <button
            onClick={() => setActivePanel('preview')}
            className={`flex flex-col items-center justify-center w-full h-full
              ${activePanel === 'preview' ? 'text-primary-600' : 'text-gray-500'}`}
          >
            <FiEye className="text-xl mb-1" />
            <span className="text-xs">Preview</span>
          </button>
          <button
            onClick={() => setActivePanel('settings')}
            className={`flex flex-col items-center justify-center w-full h-full
              ${activePanel === 'settings' ? 'text-primary-600' : 'text-gray-500'}`}
          >
            <FiSettings className="text-xl mb-1" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}