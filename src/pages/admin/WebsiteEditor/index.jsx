import { lazyLoadComponent } from '../../../utils/lazyLoad';
import { useWebsiteEditor } from './hooks/useWebsiteEditor';

const EditorHeader = lazyLoadComponent(() => import('./components/EditorHeader'));
const SectionsSidebar = lazyLoadComponent(() => import('./components/SectionsSidebar'));
const EditorPanel = lazyLoadComponent(() => import('./components/EditorPanel'));
const PreviewPanel = lazyLoadComponent(() => import('./components/PreviewPanel'));

export default function WebsiteEditor() {
  const { 
    sections,
    activeSection,
    handleSave,
    handlePreview,
    setActiveSection
  } = useWebsiteEditor();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <EditorHeader onSave={handleSave} onPreview={handlePreview} />
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 border-r pr-6">
            <SectionsSidebar 
              sections={sections}
              activeSection={activeSection}
              onSectionSelect={setActiveSection}
            />
          </div>
          
          <div className="col-span-9">
            <EditorPanel 
              activeSection={activeSection} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}