import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiCodesandbox, FiPlus, FiEdit2, FiTrash2, FiShield, FiLock, FiRefreshCw } from 'react-icons/fi';
import { nanoid } from 'nanoid';
import { ethers } from 'ethers';
import { Toaster } from '@components/ui/Toaster';

export default function TokenManagement() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedToken, setSelectedToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenOperation, setTokenOperation] = useState(null);

  const initialTokenState = {
    id: '',
    name: '',
    symbol: '',
    totalSupply: 0,
    decimals: 18,
    contractAddress: '',
    distribution: {
      team: 20,
      rewards: 30,
      liquidity: 30,
      marketing: 20
    },
    rewardRates: {
      recruitment: 100,
      sales: 50,
      leadership: 200
    },
    security: {
      transferLock: false,
      mintingEnabled: true,
      burningEnabled: true,
      maxTransactionLimit: 0,
      cooldownPeriod: 0
    },
    vesting: {
      enabled: false,
      schedule: [],
      cliffPeriod: 0,
      vestingDuration: 0
    },
    metadata: {
      createdAt: null,
      lastModified: null,
      version: '1.0.0',
      chainId: 1
    }
  };

  const [newToken, setNewToken] = useState(initialTokenState);

  // Encryption key management
  const generateEncryptionKey = async () => {
    const key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );
    return key;
  };

  // Secure storage handling
  const secureStore = {
    async encrypt(data, key) {
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encodedData = new TextEncoder().encode(JSON.stringify(data));
      
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        key,
        encodedData
      );

      return {
        encryptedData: Array.from(new Uint8Array(encryptedData)),
        iv: Array.from(iv)
      };
    },

    async decrypt(encryptedData, key, iv) {
      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: new Uint8Array(iv)
        },
        key,
        new Uint8Array(encryptedData)
      );

      return JSON.parse(new TextDecoder().decode(decryptedData));
    }
  };

  // Token validation
  const validateToken = (token) => {
    const errors = [];
    
    if (!token.name || token.name.length < 3) {
      errors.push('Token name must be at least 3 characters');
    }
    
    if (!token.symbol || token.symbol.length < 2) {
      errors.push('Token symbol must be at least 2 characters');
    }
    
    if (token.totalSupply <= 0) {
      errors.push('Total supply must be greater than 0');
    }

    const distributionSum = Object.values(token.distribution).reduce((a, b) => a + b, 0);
    if (distributionSum !== 100) {
      errors.push('Distribution percentages must sum to 100%');
    }

    return errors;
  };

  // Smart contract interaction
  const deployToken = async (token) => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      const TokenFactory = new ethers.ContractFactory(
        tokenABI,
        tokenBytecode,
        signer
      );

      const deployedToken = await TokenFactory.deploy(
        token.name,
        token.symbol,
        token.totalSupply,
        token.decimals
      );

      await deployedToken.deployed();
      
      return deployedToken.address;
    } catch (error) {
      console.error('Token deployment failed:', error);
      throw error;
    }
  };

  // Token operations
  const handleAddToken = async () => {
    try {
      setLoading(true);
      
      const errors = validateToken(newToken);
      if (errors.length > 0) {
        errors.forEach(error => toast.error(error));
        return;
      }

      const tokenId = nanoid();
      const contractAddress = await deployToken(newToken);
      
      const tokenData = {
        ...newToken,
        id: tokenId,
        contractAddress,
        metadata: {
          ...newToken.metadata,
          createdAt: Date.now(),
          lastModified: Date.now()
        }
      };

      const key = await generateEncryptionKey();
      const encryptedToken = await secureStore.encrypt(tokenData, key);
      
      const updatedTokens = [...tokens, tokenData];
      setTokens(updatedTokens);
      
      await saveTokensToSecureStorage(updatedTokens);
      
      toast.success('Token created successfully');
      setNewToken(initialTokenState);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to create token: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateToken = async (tokenId, updates) => {
    try {
      setLoading(true);
      
      const updatedTokens = tokens.map(token => 
        token.id === tokenId 
          ? { 
              ...token, 
              ...updates, 
              metadata: {
                ...token.metadata,
                lastModified: Date.now()
              }
            }
          : token
      );

      await saveTokensToSecureStorage(updatedTokens);
      setTokens(updatedTokens);
      
      toast.success('Token updated successfully');
    } catch (error) {
      toast.error('Failed to update token: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteToken = async (tokenId) => {
    try {
      setLoading(true);
      
      const updatedTokens = tokens.filter(token => token.id !== tokenId);
      await saveTokensToSecureStorage(updatedTokens);
      setTokens(updatedTokens);
      
      toast.success('Token deleted successfully');
    } catch (error) {
      toast.error('Failed to delete token: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Security features
  const handleSecurityUpdate = async (tokenId, securitySettings) => {
    try {
      const token = tokens.find(t => t.id === tokenId);
      if (!token) throw new Error('Token not found');

      // Update smart contract security settings
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(token.contractAddress, tokenABI, signer);

      await tokenContract.updateSecuritySettings(securitySettings);
      
      await handleUpdateToken(tokenId, { security: securitySettings });
      
      toast.success('Security settings updated successfully');
    } catch (error) {
      toast.error('Failed to update security settings: ' + error.message);
    }
  };

  // Vesting schedule management
  const handleVestingUpdate = async (tokenId, vestingSchedule) => {
    try {
      const token = tokens.find(t => t.id === tokenId);
      if (!token) throw new Error('Token not found');

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(token.contractAddress, tokenABI, signer);

      await tokenContract.updateVestingSchedule(vestingSchedule);
      
      await handleUpdateToken(tokenId, { vesting: vestingSchedule });
      
      toast.success('Vesting schedule updated successfully');
    } catch (error) {
      toast.error('Failed to update vesting schedule: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Token Management</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            disabled={loading}
          >
            <FiPlus className="mr-2" />
            Create Token
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokens.map((token) => (
              <TokenCard
                key={token.id}
                token={token}
                onUpdate={handleUpdateToken}
                onDelete={handleDeleteToken}
                onSecurityUpdate={handleSecurityUpdate}
                onVestingUpdate={handleVestingUpdate}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Token Creation/Edit Modal */}
      <TokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        token={selectedToken || newToken}
        onSubmit={selectedToken ? handleUpdateToken : handleAddToken}
        loading={loading}
      />
    </div>
  );
}

// Subcomponents
const TokenCard = ({ token, onUpdate, onDelete, onSecurityUpdate, onVestingUpdate }) => {
  // ... TokenCard implementation
};

const TokenModal = ({ isOpen, onClose, token, onSubmit, loading }) => {
  // ... TokenModal implementation
};

// Smart contract ABI and bytecode
const tokenABI = [
  // ... your token contract ABI
];

const tokenBytecode = "0x..."; // Your token contract bytecode
