import React, { useState } from 'react';

const LeaderboardSystem = () => {
  const [leaderboardData] = useState({
    daily: [
      { id: 1, username: 'TopRecruiter123', points: 2500, recruits: 5, rank: 1, trend: 'up' },
      { id: 2, username: 'TeamBuilder99', points: 2200, recruits: 4, rank: 2, trend: 'down' },
      { id: 3, username: 'NetworkPro', points: 2000, recruits: 4, rank: 3, trend: 'stable' },
      { id: 4, username: 'SalesGuru', points: 1800, recruits: 3, rank: 4, trend: 'up' },
      { id: 5, username: 'MLMaster', points: 1600, recruits: 3, rank: 5, trend: 'down' }
    ],
    weekly: [
      { id: 1, username: 'NetworkPro', points: 12500, recruits: 25, rank: 1, trend: 'up' },
      { id: 2, username: 'TopRecruiter123', points: 11000, recruits: 20, rank: 2, trend: 'stable' },
      { id: 3, username: 'TeamBuilder99', points: 10500, recruits: 18, rank: 3, trend: 'up' },
      { id: 4, username: 'MLMaster', points: 9800, recruits: 15, rank: 4, trend: 'down' },
      { id: 5, username: 'SalesGuru', points: 9500, recruits: 14, rank: 5, trend: 'stable' }
    ]
  });

  const [activeTab, setActiveTab] = useState('daily');

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return '#27ae60';
      case 'down':
        return '#e74c3c';
      default:
        return '#7f8c8d';
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>Top Performers</h2>
        <div className="tab-switcher">
          <button 
            className={`tab-button ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            Daily
          </button>
          <button 
            className={`tab-button ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="leaderboard-table">
        <div className="table-header">
          <div className="rank-col">Rank</div>
          <div className="user-col">User</div>
          <div className="points-col">Points</div>
          <div className="recruits-col">Recruits</div>
          <div className="trend-col">Trend</div>
        </div>

        <div className="table-body">
          {leaderboardData[activeTab].map((entry) => (
            <div key={entry.id} className="table-row">
              <div className="rank-col">
                <span className={`rank-badge rank-${entry.rank}`}>
                  {entry.rank}
                </span>
              </div>
              <div className="user-col">
                <span className="username">{entry.username}</span>
              </div>
              <div className="points-col">
                {entry.points.toLocaleString()}
              </div>
              <div className="recruits-col">
                {entry.recruits}
              </div>
              <div 
                className="trend-col"
                style={{ color: getTrendColor(entry.trend) }}
              >
                {getTrendIcon(entry.trend)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="leaderboard-footer">
        <p className="update-text">
          Updates {activeTab === 'daily' ? 'every hour' : 'every day'}
        </p>
      </div>
    </div>
  );
};

export default LeaderboardSystem;
