import { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { FiSave, FiEye, FiUndo, FiRedo, FiLayout, FiGrid, FiCode } from 'react-icons/fi';
import ElementLibrary from './ElementLibrary';
import StyleEditor from './StyleEditor';
import PreviewPane from './PreviewPane';
import ResponsiveControls from './ResponsiveControls';
import CodeEditor from './CodeEditor';
import TemplateLibrary from './TemplateLibrary';
import RevisionHistory from './RevisionHistory';
import ThemeEditor from './ThemeEditor';
import ThemePresetManager from '../theme/ThemePresetManager';
import PageTemplateManager from './PageTemplateManager';
import ComponentLibrary from './ComponentLibrary';
import StyleHistory from './StyleHistory';

export default function WebsiteEditor() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [viewMode, setViewMode] = useState('desktop'); // desktop, tablet, mobile
  const [showCode, setShowCode] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);
  
  const [pageStructure, setPageStructure] = useState({
    sections: [],
    styles: {},
    layout: 'fluid',
    customCSS: '',
    customJS: '',
    meta: {
      title: '',
      description: '',
      keywords: ''
    },
    settings: {
      responsive: true,
      animations: true,
      lazyLoading: true
    }
  });

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [autoSave, setAutoSave] = useState(true);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave) {
      const saveTimer = setInterval(() => {
        handleSave();
      }, 30000); // Auto-save every 30 seconds

      return () => clearInterval(saveTimer);
    }
  }, [pageStructure, autoSave]);

  const handleSave = async () => {
    try {
      // Save to backend
      await savePageStructure(pageStructure);
      // Save revision history
      await saveRevision(pageStructure);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPageStructure(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPageStructure(history[historyIndex + 1]);
    }
  };

  const handleElementSelect = useCallback((element) => {
    setSelectedElement(element);
  }, []);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleTemplateApply = (template) => {
    setActiveTemplate(template);
    setPageStructure(prev => ({
      ...prev,
      ...template.structure
    }));
  };

  const generateResponsiveStyles = useCallback(() => {
    // Generate responsive styles based on viewMode
    const styles = {};
    Object.entries(pageStructure.styles).forEach(([elementId, elementStyles]) => {
      styles[elementId] = {
        ...elementStyles,
        ...(elementStyles[viewMode] || {})
      };
    });
    return styles;
  }, [pageStructure.styles, viewMode]);

  const addToHistory = (newState) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newSections = Array.from(pageStructure.sections);
    const [reorderedItem] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedItem);

    const newState = {
      ...pageStructure,
      sections: newSections
    };

    setPageStructure(newState);
    addToHistory(newState);
  };

  const updateElementStyles = (elementId, styles) => {
    const newStyles = {
      ...pageStructure.styles,
      [elementId]: {
        ...pageStructure.styles[elementId],
        ...styles
      }
    };

    const newState = {
      ...pageStructure,
      styles: newStyles
    };

    setPageStructure(newState);
    addToHistory(newState);
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-3 space-y-4">
        <ComponentLibrary />
        <StyleHistory />
      </div>
      
      <div className="col-span-6">
        {/* Main editing area */}
        <div id="page-content" className="min-h-screen bg-white rounded-lg shadow">
          <div className="flex h-screen">
            <div className="flex flex-col w-64 bg-gray-800 text-white">
              <ElementLibrary onElementSelect={handleElementSelect} />
              <TemplateLibrary onTemplateSelect={handleTemplateApply} />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="h-16 bg-white border-b flex items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                  <button onClick={handleUndo} disabled={historyIndex <= 0}>
                    <FiUndo />
                  </button>
                  <button onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
                    <FiRedo />
                  </button>
                  <ResponsiveControls
                    activeMode={viewMode}
                    onModeChange={handleViewModeChange}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <button onClick={() => setShowCode(!showCode)}>
                    <FiCode />
                  </button>
                  <button onClick={handleSave}>
                    <FiSave />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <div className="flex-1 bg-gray-100 overflow-auto">
                    {showCode ? (
                      <CodeEditor
                        structure={pageStructure}
                        onUpdate={setPageStructure}
                      />
                    ) : (
                      <EditorCanvas
                        structure={pageStructure}
                        styles={generateResponsiveStyles()}
                        viewMode={viewMode}
                        onElementSelect={handleElementSelect}
                      />
                    )}
                  </div>
                </DragDropContext>

                {selectedElement && (
                  <StyleEditor
                    element={selectedElement}
                    viewMode={viewMode}
                    onStyleUpdate={updateElementStyles}
                  />
                )}
              </div>
            </div>

            <PreviewPane
              structure={pageStructure}
              styles={generateResponsiveStyles()}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
      
      <div className="col-span-3 space-y-4">
        <ThemeEditor />
        <ThemePresetManager />
        <PageTemplateManager />
      </div>
    </div>
  );
}
