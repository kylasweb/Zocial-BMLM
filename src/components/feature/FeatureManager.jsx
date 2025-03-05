import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiToggleLeft, FiToggleRight, FiShield, FiAlertCircle } from 'react-icons/fi';
import { useFeatureContext } from '../../contexts/FeatureContext';

export default function FeatureManager() {
  const { updateSystemFeatures } = useFeatureContext();

  const [featureGroups, setFeatureGroups] = useState({
    core: {
      enabled: true,
      locked: true, // Core features cannot be disabled
      features: {
        userManagement: { enabled: true, locked: true },
        authentication: { enabled: true, locked: true },
        basicReporting: { enabled: true, locked: true }
      }
    },
    network: {
      enabled: true,
      features: {
        binaryMatrix: { 
          enabled: true,
          dependencies: [],
          subFeatures: {
            autoBalancing: { enabled: true },
            spillover: { enabled: true },
            compression: { enabled: true }
          }
        },
        poolSystem: {
          enabled: true,
          dependencies: ['network.binaryMatrix'],
          subFeatures: {
            autopool: { enabled: true },
            dynamicPool: { enabled: true },
            poolRewards: { enabled: true }
          }
        }
      }
    },
    rewards: {
      enabled: true,
      features: {
        commission: {
          enabled: true,
          dependencies: ['network.binaryMatrix'],
          subFeatures: {
            directBonus: { enabled: true },
            matchingBonus: { enabled: true },
            leadershipBonus: { enabled: true }
          }
        },
        gamification: {
          enabled: true,
          dependencies: ['rewards.commission'],
          subFeatures: {
            achievements: { enabled: true },
            quests: { enabled: true },
            leaderboard: { enabled: true }
          }
        }
      }
    },
    finance: {
      enabled: true,
      features: {
        wallet: {
          enabled: true,
          dependencies: ['core.userManagement'],
          subFeatures: {
            fiat: { enabled: true },
            crypto: { enabled: true },
            tokenization: { enabled: true }
          }
        },
        customTokens: {
          enabled: false,
          dependencies: ['finance.wallet'],
          subFeatures: {
            creation: { enabled: false },
            distribution: { enabled: false },
            trading: { enabled: false }
          }
        }
      }
    },
    education: {
      enabled: true,
      features: {
        courses: {
          enabled: true,
          dependencies: [],
          subFeatures: {
            videoContent: { enabled: true },
            certification: { enabled: true },
            assessments: { enabled: true }
          }
        },
        ottServices: {
          enabled: false,
          dependencies: ['education.courses'],
          subFeatures: {
            liveStreaming: { enabled: false },
            webinars: { enabled: false },
            contentLibrary: { enabled: false }
          }
        }
      }
    },
    security: {
      enabled: true,
      features: {
        standardSecurity: {
          enabled: true,
          locked: true,
          subFeatures: {
            twoFactor: { enabled: true },
            encryption: { enabled: true },
            audit: { enabled: true }
          }
        },
        advancedSecurity: {
          enabled: false,
          dependencies: ['security.standardSecurity'],
          subFeatures: {
            fraudDetection: { enabled: false },
            riskAnalysis: { enabled: false },
            behaviorMonitoring: { enabled: false }
          }
        }
      }
    },
    stealth: {
      enabled: false,
      hidden: true, // Only visible to super admins
      features: {
        monitoring: {
          enabled: false,
          subFeatures: {
            userShadowing: { enabled: false },
            silentRestrictions: { enabled: false },
            hiddenManipulation: { enabled: false }
          }
        },
        systemControl: {
          enabled: false,
          subFeatures: {
            traceRemoval: { enabled: false },
            shadowOperations: { enabled: false },
            emergencyProtocols: { enabled: false }
          }
        }
      }
    }
  });

  const checkDependencies = (path, enabled) => {
    const dependencies = getFeatureByPath(path)?.dependencies || [];
    if (!enabled) {
      // Check if disabling this feature affects other features
      return findDependentFeatures(path).every(depPath => {
        const depFeature = getFeatureByPath(depPath);
        return !depFeature.enabled;
      });
    } else {
      // Check if all dependencies are enabled
      return dependencies.every(depPath => {
        const depFeature = getFeatureByPath(depPath);
        return depFeature.enabled;
      });
    }
  };

  const getFeatureByPath = (path) => {
    return path.split('.').reduce((obj, key) => obj?.[key], featureGroups);
  };

  const findDependentFeatures = (path) => {
    const dependentPaths = [];
    const searchDependencies = (obj, currentPath) => {
      if (typeof obj !== 'object') return;
      
      Object.entries(obj).forEach(([key, value]) => {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        if (value.dependencies?.includes(path)) {
          dependentPaths.push(newPath);
        }
        if (value.features) searchDependencies(value.features, newPath);
        if (value.subFeatures) searchDependencies(value.subFeatures, newPath);
      });
    };

    searchDependencies(featureGroups, '');
    return dependentPaths;
  };

  const toggleFeature = (path, isSubFeature = false) => {
    const feature = getFeatureByPath(path);
    if (feature.locked) return;

    const newEnabled = !feature.enabled;
    if (!checkDependencies(path, newEnabled)) {
      alert('Cannot toggle feature due to dependencies');
      return;
    }

    setFeatureGroups(prev => {
      const newGroups = { ...prev };
      const pathParts = path.split('.');
      let current = newGroups;
      
      pathParts.forEach((part, index) => {
        if (index === pathParts.length - 1) {
          current[part].enabled = newEnabled;
          
          // Toggle all subfeatures
          if (current[part].subFeatures) {
            Object.keys(current[part].subFeatures).forEach(subKey => {
              current[part].subFeatures[subKey].enabled = newEnabled;
            });
          }
        } else {
          current = current[part].features || current[part].subFeatures;
        }
      });

      return newGroups;
    });

    // Update system-wide feature flags
    updateSystemFeatures(path, newEnabled);
  };

  const renderFeatureGroup = (group, groupName, path = '') => {
    const currentPath = path ? `${path}.${groupName}` : groupName;
    
    if (group.hidden && !isAdmin) return null;

    return (
      <div key={groupName} className="feature-group mb-6">
        <motion.div
          className="flex items-center justify-between p-3 bg-gray-100 rounded"
          whileHover={{ scale: 1.01 }}
        >
          <span className="font-semibold capitalize">
            {groupName.replace(/([A-Z])/g, ' $1')}
          </span>
          {!group.locked && (
            <button
              onClick={() => toggleFeature(currentPath)}
              className="focus:outline-none"
            >
              {group.enabled ? 
                <FiToggleRight size={24} className="text-green-500" /> : 
                <FiToggleLeft size={24} className="text-gray-400" />
              }
            </button>
          )}
        </motion.div>

        <div className="ml-4 mt-2">
          {group.features && Object.entries(group.features).map(([featureName, feature]) => (
            <div key={featureName}>
              {renderFeature(feature, featureName, currentPath)}
              {feature.subFeatures && (
                <div className="ml-4">
                  {Object.entries(feature.subFeatures).map(([subName, subFeature]) => (
                    renderFeature(subFeature, subName, `${currentPath}.${featureName}`, true)
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFeature = (feature, featureName, path, isSubFeature = false) => {
    const currentPath = `${path}.${featureName}`;
    
    return (
      <motion.div
        key={featureName}
        className={`flex items-center justify-between p-2 ${
          isSubFeature ? 'bg-gray-50' : 'bg-white'
        } rounded mt-2`}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center">
          <span className="capitalize">
            {featureName.replace(/([A-Z])/g, ' $1')}
          </span>
          {feature.dependencies?.length > 0 && (
            <FiAlertCircle
              size={16}
              className="ml-2 text-yellow-500"
              title={`Dependencies: ${feature.dependencies.join(', ')}`}
            />
          )}
        </div>
        {!feature.locked && (
          <button
            onClick={() => toggleFeature(currentPath, isSubFeature)}
            className="focus:outline-none"
          >
            {feature.enabled ? 
              <FiToggleRight size={24} className="text-green-500" /> : 
              <FiToggleLeft size={24} className="text-gray-400" />
            }
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Feature Management</h2>
      <div className="space-y-4">
        {Object.entries(featureGroups).map(([groupName, group]) => 
          renderFeatureGroup(group, groupName)
        )}
      </div>
    </div>
  );
}
