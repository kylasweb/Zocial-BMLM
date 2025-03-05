import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import ElementLibrary from './ElementLibrary';
import StyleEditor from './StyleEditor';
import PreviewPane from './PreviewPane';

export default function WebsiteEditor() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [pageStructure, setPageStructure] = useState({
    sections: [],
    styles: {},
    layout: 'fluid'
  });

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

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
    <div className="flex h-screen">
      <ElementLibrary />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 bg-gray-100">
          <Droppable droppableId="page-canvas">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-full p-6"
              >
                {pageStructure.sections.map((section, index) => (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {/* Section content */}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {selectedElement && (
        <StyleEditor
          element={selectedElement}
          onStyleUpdate={updateElementStyles}
        />
      )}

      <PreviewPane structure={pageStructure} />
    </div>
  );
}