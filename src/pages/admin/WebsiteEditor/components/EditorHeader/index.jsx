import { FiSave, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function EditorHeader({ onSave, onPreview }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Website Editor</h2>
      <div className="flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onPreview}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <FiEye className="mr-2" />
          Preview
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onSave}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <FiSave className="mr-2" />
          Save Changes
        </motion.button>
      </div>
    </div>
  );
}