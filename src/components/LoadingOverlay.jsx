import { useSelector } from 'react-redux';

export default function LoadingOverlay() {
  const isLoading = useSelector(state => state.loading.globalLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          <span className="text-gray-700">Loading...</span>
        </div>
      </div>
    </div>
  );
}