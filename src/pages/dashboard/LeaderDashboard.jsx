import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../../components/dashboard/StatsCard';
import TeamPerformanceChart from '../../components/dashboard/TeamPerformanceChart';
import TeamMembersTable from '../../components/dashboard/TeamMembersTable';

export default function LeaderDashboard() {
  const [teamStats, setTeamStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    teamEarnings: 0,
    teamRank: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch team data
    const fetchTeamData = async () => {
      try {
        // API calls here
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team data:', error);
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Team Members"
          value={teamStats.totalMembers}
          icon="users"
        />
        <StatsCard
          title="Active Members"
          value={teamStats.activeMembers}
          icon="userCheck"
        />
        <StatsCard
          title="Team Earnings"
          value={`$${teamStats.teamEarnings}`}
          icon="dollarSign"
        />
        <StatsCard
          title="Team Rank"
          value={teamStats.teamRank}
          icon="award"
        />
      </div>

      <TeamPerformanceChart />
      <TeamMembersTable />
    </div>
  );
}