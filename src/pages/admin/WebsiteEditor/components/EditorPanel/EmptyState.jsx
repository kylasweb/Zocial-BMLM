import { FiLayout } from 'react-icons/fi';

export function EmptyState() {
  return (
    <div className="text-center text-gray-500 py-12">
      <FiLayout className="mx-auto h-12 w-12 mb-4" />
      <h3 className="text-lg font-medium mb-2">No Section Selected</h3>
      <p className="text-sm">Select a section from the sidebar to start editing</p>
    </div>
  );
}