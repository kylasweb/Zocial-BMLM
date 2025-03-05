import React from 'react';

export default function NetworkManager() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Zocial Network Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Community Features</h3>
          <FeatureToggleGroup
            features={{
              communityFeatures: true,
              contentManagement: true,
              reputationSystem: true,
              p2pInteractions: true,
              decentralizedStorage: true
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">User Profiles</h3>
          <ProfileSettingsManager
            settings={{
              achievements: true,
              badges: true,
              activityHistory: true,
              reputationScore: true
            }}
          />
        </div>
      </div>
    </div>
  );
}