import { useState } from 'react';

export default function FAQAccordion({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md">
          <button
            className="w-full p-4 text-left flex justify-between items-center"
            onClick={() => toggleAccordion(index)}
          >
            <span className="font-medium">{faq.question}</span>
            <svg
              className={`w-5 h-5 transition-transform ${
                activeIndex === index ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {activeIndex === index && (
            <div className="p-4 pt-0 border-t border-gray-100">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}