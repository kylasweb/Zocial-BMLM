import React from 'react';

export default function TeamManagementSystem() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Team Management System</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Team Structure</h3>
          <TeamStructureManager
            features={{
              directDownline: true,
              teamHierarchy: true,
              positionManagement: true,
              spilloverSettings: {
                view: true,
                suggest: true, // Can suggest spillover placements
                autoBalance: true
              }
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">Team Development</h3>
          <DevelopmentManager
            settings={{
              trainingAssignment: true,
              goalSetting: true,
              performanceTracking: true,
              mentorshipProgram: true
            }}
          />
        </div>
      </div>
    </div>
  );
}