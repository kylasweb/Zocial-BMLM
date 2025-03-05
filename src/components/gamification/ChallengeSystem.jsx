import React, { useState, useEffect } from 'react';

const ChallengeSystem = () => {
  const [challenges] = useState({
    daily: [{
      id: 'daily-1',
      title: 'Power Hour',
      description: 'Recruit 2 members in the next hour',
      reward: {
        instant: { tokens: 100 },
        completion: { badge: 'speed-recruiter' }
      },
      type: 'timed',
      duration: 3600, // seconds
      difficulty: 'medium',
      teamBased: false
    }],
    team: [{
      id: 'team-1',
      title: 'Team Sprint',
      description: 'Collectively recruit 20 members',
      reward: {
        team: { tokens: 1000 },
        individual: { tokens: 200 }
      },
      progress: {
        current: 0,
        target: 20,
        contributions: {}
      },
      duration: '48h',
      minTeamSize: 5
    }]
  });

  const [activeTab, setActiveTab] = useState('daily');
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      updateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateTimeLeft = () => {
    const newTimeLeft = {};
    challenges[activeTab].forEach(challenge => {
      if (challenge.type === 'timed') {
        // Calculate remaining time
        const remaining = challenge.duration - (Date.now() / 1000 % challenge.duration);
        newTimeLeft[challenge.id] = remaining;
      }
    });
    setTimeLeft(newTimeLeft);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const getProgressPercentage = (challenge) => {
    if (challenge.progress) {
      return (challenge.progress.current / challenge.progress.target) * 100;
    }
    return 0;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return '#27ae60';
      case 'medium':
        return '#f39c12';
      case 'hard':
        return '#c0392b';
      default:
        return '#7f8c8d';
    }
  };

  return (
    <div className="challenge-container">
      <div className="challenge-header">
        <h2>Active Challenges</h2>
        <div className="tab-switcher">
          <button 
            className={`tab-button ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            Daily Challenges
          </button>
          <button 
            className={`tab-button ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Team Challenges
          </button>
        </div>
      </div>

      <div className="challenges-grid">
        {challenges[activeTab].map(challenge => (
          <div key={challenge.id} className="challenge-card">
            <div className="challenge-header">
              <h3>{challenge.title}</h3>
              {challenge.difficulty && (
                <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(challenge.difficulty) }}
                >
                  {challenge.difficulty}
                </span>
              )}
            </div>

            <p className="challenge-description">{challenge.description}</p>

            <div className="challenge-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${getProgressPercentage(challenge)}%` }}
                />
              </div>
              {challenge.progress && (
                <span className="progress-text">
                  {challenge.progress.current} / {challenge.progress.target}
                </span>
              )}
            </div>

            <div className="challenge-rewards">
              <h4>Rewards:</h4>
              <ul>
                {challenge.reward.instant && (
                  <li>Instant: {challenge.reward.instant.tokens} tokens</li>
                )}
                {challenge.reward.completion && (
                  <li>Completion: {challenge.reward.completion.badge} badge</li>
                )}
                {challenge.reward.team && (
                  <li>Team: {challenge.reward.team.tokens} tokens</li>
                )}
                {challenge.reward.individual && (
                  <li>Individual: {challenge.reward.individual.tokens} tokens</li>
                )}
              </ul>
            </div>

            {timeLeft[challenge.id] && (
              <div className="challenge-timer">
                Time remaining: {formatTime(timeLeft[challenge.id])}
              </div>
            )}

            {challenge.teamBased && (
              <div className="team-info">
                <span className="team-badge">Team Challenge</span>
                <span className="team-size">Min. Team Size: {challenge.minTeamSize}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeSystem;
