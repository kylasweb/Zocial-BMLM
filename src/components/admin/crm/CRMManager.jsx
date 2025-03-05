import React from 'react';

export default function CRMManager() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">CRM Integration Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Lead Management</h3>
          <FeatureToggleGroup
            features={{
              leadTracking: true,
              automatedFollowup: true,
              leadScoring: true,
              prospectAnalytics: true
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">Communication Tools</h3>
          <CommunicationSettingsManager
            settings={{
              emailAutomation: true,
              chatIntegration: true,
              notificationSystem: true,
              campaignManager: true
            }}
          />
        </div>
      </div>
    </div>
  );
}