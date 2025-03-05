import { Suspense } from 'react';
import { lazyLoadComponent } from '../../../utils/lazyLoad';

const Stats = lazyLoadComponent(() => import('./sections/Stats'));
const RecentActivity = lazyLoadComponent(() => import('./sections/RecentActivity'));
const Charts = lazyLoadComponent(() => import('./sections/Charts'));
const QuickActions = lazyLoadComponent(() => import('./sections/QuickActions'));

export default function AdminDashboard() {
  return (
    <div className="grid gap-6 p-6">
      <Stats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <Charts />
      </div>
      <QuickActions />
    </div>
  );
}