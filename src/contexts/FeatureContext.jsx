import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FeatureContext = createContext();

export function FeatureProvider({ children }) {
  const { user } = useAuth();
  const [enabledFeatures, setEnabledFeatures] = useState(new Set());
  const [featureConfig, setFeatureConfig] = useState({
    chat: {
      encryption: true,
      multimedia: true,
      webrtc: true
    },
    exchange: {
      trading: true,
      defi: true,
      crossChain: true
    },
    life: {
      nft: true,
      staking: true,
      payments: true
    },
    security: {
      twoFactor: true,
      encryption: true,
      monitoring: true
    }
  });

  useEffect(() => {
    if (user) {
      loadUserFeatures();
    }
  }, [user]);

  const loadUserFeatures = async () => {
    try {
      const response = await fetch(`/api/user-features/${user.id}`);
      const features = await response.json();
      setEnabledFeatures(new Set(features));
    } catch (error) {
      console.error('Failed to load user features:', error);
    }
  };

  const updateSystemFeatures = async (featurePath, enabled) => {
    try {
      await fetch('/api/update-features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, featurePath, enabled })
      });

      setEnabledFeatures(prev => {
        const newSet = new Set(prev);
        if (enabled) {
          newSet.add(featurePath);
        } else {
          newSet.delete(featurePath);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Failed to update feature:', error);
      throw error;
    }
  };

  const isFeatureEnabled = (featurePath) => {
    return enabledFeatures.has(featurePath);
  };

  const value = {
    enabledFeatures,
    featureConfig,
    updateSystemFeatures,
    isFeatureEnabled,
    refreshFeatures: loadUserFeatures
  };

  return (
    <FeatureContext.Provider value={value}>
      {children}
    </FeatureContext.Provider>
  );
}

export const useFeatureContext = () => useContext(FeatureContext);
