import { motion } from 'framer-motion';

export default function GDPRPage() {
  return (
    <div className="min-h-screen">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">GDPR Policy</h1>
          <p className="text-xl md:text-2xl mb-8">Last updated: December 2023</p>
        </div>
      </motion.section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Data Protection Principles</h2>
            <p>We process your personal data according to the following principles...</p>

            <h2>2. Your Rights Under GDPR</h2>
            <p>Under GDPR, you have several rights regarding your personal data...</p>

            <h2>3. Data Protection Measures</h2>
            <p>We implement appropriate technical and organizational measures...</p>

            {/* Add more GDPR policy content */}
          </div>
        </div>
      </section>
    </div>
  );
}