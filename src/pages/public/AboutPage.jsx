import { motion } from 'framer-motion';
import { FaUsers, FaChartLine, FaHandshake, FaGlobe } from 'react-icons/fa';

export default function AboutPage() {
  const milestones = [
    { year: '2020', title: 'Foundation', description: 'Zocial was established with a vision to revolutionize digital interactions' },
    { year: '2021', title: 'Global Expansion', description: 'Expanded operations to over 50 countries' },
    { year: '2022', title: 'Blockchain Integration', description: 'Integrated blockchain technology for transparent transactions' },
    { year: '2023', title: 'Community Growth', description: 'Reached 1 million active users worldwide' }
  ];

  const values = [
    { icon: <FaUsers className="w-8 h-8" />, title: 'Community First', description: 'Building strong, lasting relationships within our community' },
    { icon: <FaChartLine className="w-8 h-8" />, title: 'Innovation', description: 'Constantly evolving and improving our technology' },
    { icon: <FaHandshake className="w-8 h-8" />, title: 'Trust', description: 'Maintaining transparency and reliability in all operations' },
    { icon: <FaGlobe className="w-8 h-8" />, title: 'Global Impact', description: 'Creating positive change on a global scale' }
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
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Zocial</h1>
          <p className="text-xl md:text-2xl mb-8">Building the Future of Digital Interactions</p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl text-gray-600">
              To empower individuals and businesses through innovative blockchain technology,
              creating a sustainable ecosystem where everyone can thrive and grow together.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="text-primary-600 mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center mb-8"
              >
                <div className="w-24 text-2xl font-bold text-primary-600">{milestone.year}</div>
                <div className="flex-1 ml-8 p-6 bg-white rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}