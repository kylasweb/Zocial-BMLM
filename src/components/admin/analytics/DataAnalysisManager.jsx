import React from 'react';

export default function DataAnalysisManager() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Data Analysis Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Performance Analytics</h3>
          <AnalyticsToolManager
            features={{
              systemMetrics: true,
              userEngagement: true,
              financialAnalytics: true,
              predictiveModeling: true
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">Reporting Tools</h3>
          <ReportingSettingsManager
            settings={{
              customReports: true,
              automatedReporting: true,
              dataVisualization: true,
              exportOptions: true
            }}
          />
        </div>
      </div>
    </div>
  );
}