import { motion } from 'framer-motion';
import { useTheme } from '../../../theme/ThemeEngine';

export default function GlassCard({ 
  children, 
  className = '', 
  blur = 'md',
  opacity = 0.7,
  ...props 
}) {
  const { themeConfig } = useTheme();
  const isDark = themeConfig.darkMode;

  const glassStyles = {
    background: isDark 
      ? 'rgba(255, 255, 255, 0.03)'
      : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: `blur(${blur === 'sm' ? '8px' : blur === 'lg' ? '16px' : '12px'})`,
    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
    boxShadow: isDark 
      ? '0 8px 32px rgba(0, 0, 0, 0.37)'
      : '0 8px 32px rgba(31, 38, 135, 0.15)',
  };

  return (
    <motion.div
      className={`rounded-xl p-6 ${className}`}
      style={glassStyles}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}