import { FiLayout } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function SectionsSidebar({ sections, activeSection, onSectionSelect }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Sections</h3>
      <div className="space-y-2">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => onSectionSelect(section)}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection?.id === section.id
                ? 'bg-primary-50 text-primary-700'
                : 'hover:bg-gray-50'
            }`}
          >
            <FiLayout className="inline-block mr-2" />
            {section.title}
          </motion.button>
        ))}
      </div>
    </div>
  );
}