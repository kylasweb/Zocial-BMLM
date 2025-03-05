import React from 'react';

export default function TrainingManager() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Training & Education Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Course Management</h3>
          <CourseManager
            features={{
              createCustomCourses: true,
              assignCourses: true,
              trackProgress: true,
              provideFeedback: true
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">Resource Library</h3>
          <ResourceManager
            settings={{
              uploadMaterials: true,
              organizeMaterials: true,
              shareResources: true,
              trackUsage: true
            }}
          />
        </div>
      </div>
    </div>
  );
}