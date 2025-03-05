import { useState, useEffect } from 'react';
import { FiPlus, FiSave, FiTrash2, FiCopy } from 'react-icons/fi';

export default function PageTemplateManager() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateName, setTemplateName] = useState('');

  const saveCurrentAsTemplate = async () => {
    try {
      const currentPageContent = document.querySelector('#page-content').innerHTML;
      const template = {
        name: templateName,
        content: currentPageContent,
        styles: getComputedStyles(),
        timestamp: new Date().toISOString()
      };

      await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template)
      });

      setTemplateName('');
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  };

  const getComputedStyles = () => {
    const styles = {};
    const elements = document.querySelector('#page-content').querySelectorAll('*');
    elements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      styles[element.className] = {
        color: computedStyle.color,
        backgroundColor: computedStyle.backgroundColor,
        padding: computedStyle.padding,
        margin: computedStyle.margin,
        // Add more styles as needed
      };
    });
    return styles;
  };

  const applyTemplate = async (templateId) => {
    try {
      const response = await fetch(`/api/templates/${templateId}`);
      const template = await response.json();
      
      document.querySelector('#page-content').innerHTML = template.content;
      applyStyles(template.styles);
    } catch (error) {
      console.error('Failed to apply template:', error);
    }
  };

  const applyStyles = (styles) => {
    Object.entries(styles).forEach(([className, styleProps]) => {
      const elements = document.getElementsByClassName(className);
      Array.from(elements).forEach(element => {
        Object.assign(element.style, styleProps);
      });
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Page Templates</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Template name"
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={saveCurrentAsTemplate}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded"
          >
            <FiSave size={16} />
            <span>Save Current</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {templates.map(template => (
            <div
              key={template.id}
              className="border rounded p-4 hover:border-primary-600 cursor-pointer"
              onClick={() => setSelectedTemplate(template)}
            >
              <h4 className="font-medium">{template.name}</h4>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    applyTemplate(template.id);
                  }}
                  className="text-sm text-primary-600"
                >
                  <FiCopy size={14} />
                  <span>Apply</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete
                  }}
                  className="text-sm text-red-600"
                >
                  <FiTrash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}