export default function PlanCard({ name, price, features, recommended }) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${recommended ? 'border-2 border-primary-600' : ''}`}>
      {recommended && (
        <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
          Recommended
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4">{name}</h3>
      <div className="text-3xl font-bold mb-6">{price}</div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
        Get Started
      </button>
    </div>
  );
}