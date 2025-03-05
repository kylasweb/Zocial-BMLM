import { useState, useCallback } from 'react';
import { useTokenCrypto } from './useTokenCrypto';
import { useTokenContract } from './useTokenContract';
import { validateToken } from '../utils/tokenValidation';
import { nanoid } from 'nanoid';

export function useTokenManagement() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { encryptToken, decryptToken } = useTokenCrypto();
  const { deployToken } = useTokenContract();

  const handleAddToken = useCallback(async (tokenData) => {
    try {
      setLoading(true);
      
      const errors = validateToken(tokenData);
      if (errors.length > 0) {
        errors.forEach(error => toast.error(error));
        return;
      }

      const contractAddress = await deployToken(tokenData);
      
      const newToken = {
        ...tokenData,
        id: nanoid(),
        contractAddress,
        metadata: {
          createdAt: Date.now(),
          lastModified: Date.now(),
          version: '1.0.0',
          chainId: 1
        }
      };

      const encryptedToken = await encryptToken(newToken);
      const updatedTokens = [...tokens, encryptedToken];
      
      setTokens(updatedTokens);
      await saveTokensToStorage(updatedTokens);
      
      toast.success('Token created successfully');
      return newToken;
    } catch (error) {
      toast.error('Failed to create token: ' + error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [tokens, encryptToken, deployToken]);

  const handleUpdateToken = useCallback(async (tokenId, updates) => {
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

      await saveTokensToStorage(updatedTokens);
      setTokens(updatedTokens);
      
      toast.success('Token updated successfully');
    } catch (error) {
      toast.error('Failed to update token: ' + error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [tokens]);

  return {
    tokens,
    loading,
    handleAddToken,
    handleUpdateToken,
    handleDeleteToken
  };
}