import { lazy } from 'react';
import { lazyLoadComponent } from '../utils/lazyLoad';

// Lazy load pages
const LandingPage = lazyLoadComponent(() => import('../pages/public/LandingPage'));
const Login = lazyLoadComponent(() => import('../pages/auth/Login'));
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
    element: <Dashboard />,
    roles: ['ADMIN']
  },
  // ... other routes
];