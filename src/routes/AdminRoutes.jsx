import FakeDataManager from '../components/admin/FakeDataManager';

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
  }
];