import { lazy } from 'react';
import { lazyLoadComponent } from '../utils/lazyLoad';

// Public pages
const LandingPage = lazyLoadComponent(() => import('../pages/public/LandingPage'));
const Login = lazyLoadComponent(() => import('../pages/auth/Login'));

// Admin pages
const AdminLayout = lazyLoadComponent(() => import('../layouts/AdminLayout'));
const Dashboard = lazyLoadComponent(() => import('../pages/admin/Dashboard'));
const UserManagement = lazyLoadComponent(() => import('../pages/admin/UserManagement'));
const Settings = lazyLoadComponent(() => import('../pages/admin/Settings'));
const EnvironmentManager = lazyLoadComponent(() => import('../pages/admin/EnvironmentManager'));

export const routes = [
  {
    path: '/',
    element: <LandingPage />,
    public: true
  },
  {
    path: '/login',
    element: <Login />,
    public: true
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    roles: ['ADMIN'],
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'users', element: <UserManagement /> },
      { path: 'settings', element: <Settings /> },
      { path: 'environment', element: <EnvironmentManager /> }
    ]
  }
];
