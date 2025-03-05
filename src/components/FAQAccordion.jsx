import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQAccordion({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-lg">
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <span className="font-medium">{faq.question}</span>
            <span className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 py-4 bg-gray-50"
              >
                {faq.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}