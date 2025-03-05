import React from 'react';

export default function AdvancedSecurityManager() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Advanced Security Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Fraud Detection</h3>
          <SecurityFeatureManager
            features={{
              patternRecognition: true,
              anomalyDetection: true,
              riskScoring: true,
              automatedBlocking: true
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">Behavior Monitoring</h3>
          <MonitoringSettingsManager
            settings={{
              userActivity: true,
              transactionPatterns: true,
              loginBehavior: true,
              ipTracking: true
            }}
          />
        </div>
      </div>
    </div>
  );
}