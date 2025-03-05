import FakeDataManager from '../components/admin/FakeDataManager';
import EnvironmentManager from '../pages/admin/EnvironmentManager';
import { FiDatabase, FiSettings } from 'react-icons/fi';
import { ROLES } from '../config/roles';

export const adminRoutes = [
  {
    path: '/admin/super',
    element: <SuperAdminDashboard />,
    roles: [ROLES.SUPER_ADMIN],
    meta: {
      title: 'Super Admin Dashboard',
      requiresSuperAdmin: true
    }
  },
  {
    path: '/admin/environment',
    element: <EnvironmentManager />,
    roles: [ROLES.SUPER_ADMIN],
    meta: {
      title: 'Environment Variables',
      requiresSuperAdmin: true
    }
  },
  {
    path: '/admin/system-config',
    element: <SystemConfiguration />,
    roles: [ROLES.SUPER_ADMIN],
    meta: {
      title: 'System Configuration',
      requiresSuperAdmin: true
    }
  },
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
