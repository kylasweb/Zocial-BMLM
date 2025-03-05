import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaTrophy, FaExchangeAlt, FaShieldAlt, FaRocket } from 'react-icons/fa';

export default function FeaturesPage() {
  const features = [
    {
      icon: <FaChartLine className="w-12 h-12" />,
      title: 'Binary Matrix System',
      description: 'Advanced binary structure with spillover management and unlimited depth potential'
    },
    {
      icon: <FaUsers className="w-12 h-12" />,
      title: 'Team Building',
      description: 'Powerful tools for building and managing your downline network'
    },
    {
      icon: <FaTrophy className="w-12 h-12" />,
      title: 'Rewards System',
      description: 'Comprehensive rewards and bonuses for achieving milestones'
    },
    {
      icon: <FaExchangeAlt className="w-12 h-12" />,
      title: 'Smart Contracts',
      description: 'Blockchain-powered smart contracts for secure transactions'
    },
    {
      icon: <FaShieldAlt className="w-12 h-12" />,
      title: 'Security',
      description: 'Advanced security measures to protect your investments'
    },
    {
      icon: <FaRocket className="w-12 h-12" />,
      title: 'Fast Track Bonus',
      description: 'Special bonuses for quick advancement in the network'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Platform Features</h1>
          <p className="text-xl md:text-2xl mb-8">Discover the power of our ecosystem</p>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <div className="text-primary-600 mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">See It In Action</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {/* Add interactive demo or video content here */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
              {/* Placeholder for demo content */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}