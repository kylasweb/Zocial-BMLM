import React from 'react';

export default function PerformanceSystem() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Performance & Recognition</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Performance Tracking</h3>
          <PerformanceManager
            features={{
              setTeamGoals: true,
              trackAchievements: true,
              performanceMetrics: true,
              progressReports: true
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">Recognition Programs</h3>
          <RecognitionManager
            settings={{
              awardNominations: true,
              achievementCelebration: true,
              incentivePrograms: true,
              teamRecognition: true
            }}
          />
        </div>
      </div>
    </div>
  );
}