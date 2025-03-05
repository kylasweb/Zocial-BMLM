import React from 'react';
import { useFeatureContext } from '../../contexts/FeatureContext';
import TeamChat from './TeamChat';
import CommunityFeed from './CommunityFeed';
import CollaborationTools from './CollaborationTools';
import SocialMediaIntegration from './SocialMediaIntegration';
import GamificationModule from '../gamification/GamificationModule';
import LiveEvents from './LiveEvents';

export default function SocialHub() {
  const { isFeatureEnabled } = useFeatureContext();

  return (
    <div className="social-hub">
      <div className="social-hub-main">
        {/* Real-time Communication */}
        <TeamChat 
          features={{
            voice: true,
            video: true,
            screenSharing: true,
            fileSharing: true,
            encryption: true,
            recording: true
          }}
        />

        {/* Community Engagement */}
        <CommunityFeed 
          features={{
            posts: true,
            comments: true,
            reactions: true,
            sharing: true,
            trending: true
          }}
        />

        {/* Team Collaboration */}
        <CollaborationTools 
          features={{
            taskManagement: true,
            documentSharing: true,
            calendar: true,
            projectTracking: true
          }}
        />

        {/* Social Media Integration */}
        <SocialMediaIntegration 
          platforms={{
            twitter: {
              enabled: true,
              autoShare: true
            },
            telegram: {
              enabled: true,
              groupSync: true
            },
            discord: {
              enabled: true,
              serverIntegration: true
            }
          }}
        />

        {/* Gamification Elements */}
        {isFeatureEnabled('gamification') && (
          <GamificationModule 
            features={{
              achievements: true,
              leaderboards: true,
              challenges: true,
              rewards: true
            }}
          />
        )}

        {/* Live Events */}
        {isFeatureEnabled('liveEvents') && (
          <LiveEvents 
            features={{
              webinars: true,
              workshops: true,
              teamMeetings: true,
              broadcasts: true
            }}
          />
        )}
      </div>

      {/* Analytics Panel */}
      {isFeatureEnabled('analytics') && (
        <div className="social-hub-analytics">
          <EngagementMetrics />
          <TeamPerformance />
          <CommunityInsights />
        </div>
      )}
    </div>
  );
}
