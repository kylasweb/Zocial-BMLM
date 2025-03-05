import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl md:text-2xl mb-8">Last updated: December 2023</p>
        </div>
      </motion.section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms...</p>

            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials...</p>

            <h2>3. Disclaimer</h2>
            <p>The materials on Zocial's website are provided on an 'as is' basis...</p>

            {/* Add more terms of service content */}
          </div>
        </div>
      </section>
    </div>
  );
}