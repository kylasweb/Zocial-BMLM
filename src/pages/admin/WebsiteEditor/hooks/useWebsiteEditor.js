import { useState, useCallback } from 'react';
import { defaultSections } from '../constants';

export function useWebsiteEditor() {
  const [sections, setSections] = useState(
    JSON.parse(localStorage.getItem('websiteSections') || JSON.stringify(defaultSections))
  );
  const [activeSection, setActiveSection] = useState(null);

  const handleSave = useCallback(() => {
    localStorage.setItem('websiteSections', JSON.stringify(sections));
  }, [sections]);

  const handlePreview = useCallback(() => {
    // Preview logic here
    console.log('Preview website');
  }, []);

  const updateSectionContent = useCallback((sectionId, content) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, content } : section
    ));
  }, []);

  return {
    sections,
    activeSection,
    setActiveSection,
    handleSave,
    handlePreview,
    updateSectionContent
  };
}