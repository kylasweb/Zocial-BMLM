import { useState } from 'react';
import { FiGrid, FiLayout, FiType, FiImage, FiBox } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ComponentLibrary() {
  const [activeCategory, setActiveCategory] = useState('layout');

  const components = {
    layout: [
      { id: 'section', name: 'Section', icon: FiLayout },
      { id: 'container', name: 'Container', icon: FiBox },
      { id: 'grid', name: 'Grid', icon: FiGrid }
    ],
    content: [
      { id: 'heading', name: 'Heading', icon: FiType },
      { id: 'paragraph', name: 'Paragraph', icon: FiType },
      { id: 'image', name: 'Image', icon: FiImage }
    ]
  };

  const handleDragStart = (component) => {
    // Implementation for drag and drop functionality
  };

  const renderComponent = (component) => {
    const Icon = component.icon;
    
    return (
      <motion.div
        key={component.id}
        draggable
        onDragStart={() => handleDragStart(component)}
        className="border rounded p-4 hover:border-primary-600 cursor-move"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center space-x-2">
          <Icon size={20} />
          <span>{component.name}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Components</h3>
      
      <div className="flex space-x-4 mb-6">
        {Object.keys(components).map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded ${
              activeCategory === category 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {components[activeCategory].map(renderComponent)}
      </div>
    </div>
  );
}