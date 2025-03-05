import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '../../components/dashboard/StatsCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import UserActivityTable from '../../components/dashboard/UserActivityTable';
import SystemHealthCard from '../../components/dashboard/SystemHealthCard';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    pendingWithdrawals: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // API calls here
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon="users"
          trend={+15}
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers}
          icon="userCheck"
          trend={+5}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon="dollarSign"
          trend={+25}
        />
        <StatsCard
          title="Pending Withdrawals"
          value={stats.pendingWithdrawals}
          icon="clock"
          trend={-3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart />
        <SystemHealthCard />
      </div>

      <UserActivityTable />
    </div>
  );
}