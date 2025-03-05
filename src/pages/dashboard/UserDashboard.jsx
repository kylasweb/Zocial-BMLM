import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../../components/dashboard/StatsCard';
import PersonalPerformanceChart from '../../components/dashboard/PersonalPerformanceChart';
import ReferralTree from '../../components/dashboard/ReferralTree';
import TasksList from '../../components/dashboard/TasksList';

export default function UserDashboard() {
  const [userStats, setUserStats] = useState({
    earnings: 0,
    referrals: 0,
    rank: '',
    completedTasks: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        // API calls here
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Earnings"
          value={`$${userStats.earnings}`}
          icon="dollarSign"
        />
        <StatsCard
          title="My Referrals"
          value={userStats.referrals}
          icon="users"
        />
        <StatsCard
          title="Current Rank"
          value={userStats.rank}
          icon="award"
        />
        <StatsCard
          title="Completed Tasks"
          value={userStats.completedTasks}
          icon="checkSquare"
        />
      </div>

      <PersonalPerformanceChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReferralTree />
        <TasksList />
      </div>
    </div>
  );
}