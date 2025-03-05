import React, { useState } from 'react';

const QuestSystem = () => {
  const [questLines] = useState([
    {
      id: 'starter-journey',
      title: 'Beginner\'s Path',
      stages: [
        {
          id: 1,
          task: 'Complete profile',
          reward: { tokens: 50 },
          isCompleted: false
        },
        {
          id: 2,
          task: 'First recruitment',
          reward: { tokens: 100, tool: 'basic-analytics' },
          isCompleted: false
        }
      ],
      finalReward: {
        tokens: 500,
        badge: 'path-finder',
        rank: 'BRONZE'
      }
    },
    {
      id: 'team-builder',
      title: 'Team Builder',
      stages: [
        {
          id: 1,
          task: 'Recruit 3 team members',
          reward: { tokens: 150 },
          isCompleted: false
        },
        {
          id: 2,
          task: 'Help team achieve first sale',
          reward: { tokens: 200, tool: 'team-dashboard' },
          isCompleted: false
        }
      ],
      finalReward: {
        tokens: 1000,
        badge: 'team-leader',
        rank: 'SILVER'
      }
    }
  ]);

  const calculateQuestProgress = (quest) => {
    const completedStages = quest.stages.filter(stage => stage.isCompleted).length;
    return (completedStages / quest.stages.length) * 100;
  };

  return (
    <div className="quest-system-container">
      {questLines.map(quest => (
        <div key={quest.id} className="quest-line-card">
          <div className="quest-header">
            <h3>{quest.title}</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${calculateQuestProgress(quest)}%` }}
              />
            </div>
            <span className="progress-text">
              {`${calculateQuestProgress(quest)}% Complete`}
            </span>
          </div>

          <div className="quest-stages">
            {quest.stages.map(stage => (
              <div 
                key={stage.id} 
                className={`quest-stage ${stage.isCompleted ? 'completed' : ''}`}
              >
                <div className="stage-content">
                  <h4>{stage.task}</h4>
                  <div className="reward-info">
                    <span className="reward-tokens">
                      {stage.reward.tokens} tokens
                    </span>
                    {stage.reward.tool && (
                      <span className="reward-tool">
                        + {stage.reward.tool}
                      </span>
                    )}
                  </div>
                </div>
                <div className="stage-status">
                  {stage.isCompleted ? '✓' : '○'}
                </div>
              </div>
            ))}
          </div>

          <div className="final-reward-section">
            <h4>Final Reward</h4>
            <div className="final-reward-content">
              <div className="reward-item">
                <span className="reward-value">{quest.finalReward.tokens}</span>
                <span className="reward-label">Tokens</span>
              </div>
              <div className="reward-item">
                <span className="reward-value">{quest.finalReward.badge}</span>
                <span className="reward-label">Badge</span>
              </div>
              <div className="reward-item">
                <span className="reward-value">{quest.finalReward.rank}</span>
                <span className="reward-label">Rank</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestSystem;
