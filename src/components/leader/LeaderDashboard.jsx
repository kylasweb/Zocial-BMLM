import { useState } from 'react';
import { motion } from 'framer-motion';
import TeamManagement from './team/TeamManagement';
import PerformanceMetrics from './analytics/PerformanceMetrics';
import CommissionOverview from './finance/CommissionOverview';
import TeamManagementSystem from './team/TeamManagementSystem';
import TrainingManager from './training/TrainingManager';
import EventCoordinator from './events/EventCoordinator';
import RecruitmentManager from './recruitment/RecruitmentManager';
import PerformanceSystem from './performance/PerformanceSystem';

export default function LeaderDashboard() {
  const [activeSection, setActiveSection] = useState('team');

  const leaderFeatures = {
    team: {
      component: TeamManagement,
      capabilities: {
        memberManagement: true,
        taskAssignment: true,
        performanceTracking: true,
        communicationTools: true,
        recruitmentTools: true
      }
    },
    teamSystem: {
      component: TeamManagementSystem,
      capabilities: {
        memberManagement: true,
        taskAssignment: true,
        performanceTracking: true,
        communicationTools: true,
        recruitmentTools: true
      }
    },
    training: {
      component: TrainingManager,
      capabilities: {
        courseManagement: true,
        resourceLibrary: true,
        progressTracking: true,
        feedbackSystem: true
      }
    },
    events: {
      component: EventCoordinator,
      capabilities: {
        eventPlanning: true,
        meetingManagement: true,
        webinarTools: true,
        attendanceTracking: true
      }
    },
    recruitment: {
      component: RecruitmentManager,
      capabilities: {
        prospectManagement: true,
        onboardingTools: true,
        referralSystem: true,
        applicationProcess: true
      }
    },
    performance: {
      component: PerformanceSystem,
      capabilities: {
        goalTracking: true,
        recognitionPrograms: true,
        teamMetrics: true,
        rewardSystem: true
      }
    },
    performance: {
      component: PerformanceMetrics,
      capabilities: {
        teamMetrics: true,
        salesAnalytics: true,
        rankProgress: true,
        goalTracking: true
      }
    },
    finance: {
      component: CommissionOverview,
      capabilities: {
        commissionTracking: true,
        teamEarnings: true,
        bonusManagement: true,
        payoutSchedules: true
      }
    }
  };

  const CurrentSection = leaderFeatures[activeSection].component;

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-8">
        {Object.entries(leaderFeatures).map(([key, feature]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-3 rounded-lg ${
              activeSection === key 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-gray-700'
            }`}
            onClick={() => setActiveSection(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </motion.button>
        ))}
      </div>

      <CurrentSection capabilities={leaderFeatures[activeSection].capabilities} />
    </div>
  );
}
