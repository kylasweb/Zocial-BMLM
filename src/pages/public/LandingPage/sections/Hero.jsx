import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-20 px-4 md:px-8"
    >
      {/* Hero content */}
    </motion.section>
  );
}