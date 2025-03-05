import { lazyLoadComponent } from '../../../../../utils/lazyLoad';

const UserGrowthChart = lazyLoadComponent(() => import('./UserGrowthChart'));
const ActivityChart = lazyLoadComponent(() => import('./ActivityChart'));
const MetricsChart = lazyLoadComponent(() => import('./MetricsChart'));

export default function AnalyticsCharts() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Analytics</h2>
      <div className="space-y-6">
        <UserGrowthChart />
        <ActivityChart />
        <MetricsChart />
      </div>
    </div>
  );
}