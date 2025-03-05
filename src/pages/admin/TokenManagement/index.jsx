import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useTokenManagement } from './hooks/useTokenManagement';
import TokenList from './components/TokenList';
import TokenModal from './components/TokenModal';

export default function TokenManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { 
    tokens,
    loading,
    handleAddToken,
    handleUpdateToken,
    handleDeleteToken
  } = useTokenManagement();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Token Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg"
        >
          <FiPlus className="mr-2" />
          Create Token
        </motion.button>
      </div>

      <TokenList 
        tokens={tokens}
        loading={loading}
        onUpdate={handleUpdateToken}
        onDelete={handleDeleteToken}
      />

      <TokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddToken}
      />
    </div>
  );
}