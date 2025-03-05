import React from 'react';

export default function RecruitmentManager() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Recruitment & Onboarding</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl mb-4">Recruitment Tools</h3>
          <RecruitmentToolManager
            features={{
              prospectTracking: true,
              referralLinkManagement: true,
              recruitmentCampaigns: true,
              applicationReview: true
            }}
          />
        </div>

        <div className="card">
          <h3 className="text-xl mb-4">Onboarding Process</h3>
          <OnboardingManager
            settings={{
              welcomeSequence: true,
              trainingAssignment: true,
              mentorMatching: true,
              progressTracking: true
            }}
          />
        </div>
      </div>
    </div>
  );
}