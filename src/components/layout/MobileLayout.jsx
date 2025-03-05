import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { 
  FiHome, FiUser, FiUsers, FiAward, FiSettings, 
  FiMenu, FiX 
} from 'react-icons/fi';

export default function MobileLayout({ children }) {
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Pull to refresh handler
  const handlePullToRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
    setRefreshing(false);
  };

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setDrawerOpen(true),
    onSwipedLeft: () => setDrawerOpen(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const bottomNavItems = [
    { id: 'home', icon: FiHome, label: 'Home' },
    { id: 'network', icon: FiUsers, label: 'Network' },
    { id: 'profile', icon: FiUser, label: 'Profile' },
    { id: 'rewards', icon: FiAward, label: 'Rewards' },
    { id: 'settings', icon: FiSettings, label: 'Settings' }
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50" {...swipeHandlers}>
      {/* Pull to refresh indicator */}
      {refreshing && (
        <div className="absolute top-0 w-full flex justify-center py-2">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-6 h-6 border-2 border-primary-600 rounded-full border-t-transparent"
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 safe-area-bottom">
        <div className="flex justify-around items-center h-16">
          {bottomNavItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center justify-center w-full h-full
                ${activeTab === id ? 'text-primary-600' : 'text-gray-500'}`}
            >
              <Icon className="text-xl mb-1" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 bg-white z-50"
          >
            {/* Drawer content */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}