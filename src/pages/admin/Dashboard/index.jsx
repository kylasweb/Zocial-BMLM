import { lazyLoadComponent } from '../../../utils/lazyLoad';

const DashboardHeader = lazyLoadComponent(() => import('./components/DashboardHeader'));
const StatCards = lazyLoadComponent(() => import('./components/StatCards'));
const ActivityFeed = lazyLoadComponent(() => import('./components/ActivityFeed'));
const AnalyticsCharts = lazyLoadComponent(() => import('./components/AnalyticsCharts'));
const QuickActions = lazyLoadComponent(() => import('./components/QuickActions'));

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <DashboardHeader />
      <StatCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <AnalyticsCharts />
      </div>
      <QuickActions />
    </div>
  );
}
