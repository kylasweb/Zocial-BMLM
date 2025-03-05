import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl md:text-2xl mb-8">Last updated: December 2023</p>
        </div>
      </motion.section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us...</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to operate and improve our services...</p>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>We do not share your personal information with third parties except...</p>

            {/* Add more privacy policy content */}
          </div>
        </div>
      </section>
    </div>
  );
}