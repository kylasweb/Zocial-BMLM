import FakeDataManager from '../components/admin/FakeDataManager';
import EnvironmentManager from '../pages/admin/EnvironmentManager';
import { FiDatabase, FiSettings } from 'react-icons/fi';

export const adminRoutes = [
  // ... existing routes ...
  {
    path: '/admin/fake-data',
    element: <FakeDataManager />,
    roles: ['ADMIN'],
    meta: {
      title: 'Fake Data Management',
      icon: FiDatabase,
      hidden: true // Hide from regular navigation
    }
  },
  {
    path: '/admin/environment',
    element: <EnvironmentManager />,
    roles: ['ADMIN'],
    meta: {
      title: 'Environment Variables',
      icon: FiSettings
    }
  }
];
