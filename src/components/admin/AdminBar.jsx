import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { FiEdit, FiSettings, FiEye, FiX } from 'react-icons/fi';
import WebsiteEditor from '../editor/WebsiteEditor';

export default function AdminBar() {
  const { user } = useUser();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  if (!user?.publicMetadata?.role === 'admin') return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 h-10 flex items-center px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsEditorOpen(!isEditorOpen)}
            className="flex items-center space-x-2 hover:text-primary-400"
          >
            <FiEdit size={16} />
            <span>Edit Page</span>
          </button>

          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2 hover:text-primary-400"
          >
            <FiEye size={16} />
            <span>{previewMode ? 'Exit Preview' : 'Preview'}</span>
          </button>
        </div>
      </div>

      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsEditorOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX size={24} />
            </button>
          </div>
          <WebsiteEditor />
        </div>
      )}

      <div className={previewMode ? 'mt-0' : 'mt-10'}>
        {/* Page content will be rendered here */}
      </div>
    </>
  );
}