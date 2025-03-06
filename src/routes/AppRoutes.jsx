import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import LoadingSpinner from '@components/LoadingSpinner';

// Lazy load components using aliases
const LandingPage = lazy(() => import('@public/LandingPage'));
const AdminDashboard = lazy(() => import('@admin/AdminDashboard'));
const UserManagement = lazy(() => import('@admin/UserManagement'));
const InvestmentPlans = lazy(() => import('@admin/InvestmentPlans'));
const TaskManagement = lazy(() => import('@admin/TaskManagement'));
const PoolManagement = lazy(() => import('@admin/PoolManagement'));
const TokenManagement = lazy(() => import('@admin/TokenManagement'));
const FrontendManager = lazy(() => import('@admin/frontend/FrontendManager'));
const BalanceAdjustment = lazy(() => import('@admin/tools/BalanceAdjustment'));
const RankAdjustment = lazy(() => import('@admin/tools/RankAdjustment'));
const GamificationHub = lazy(() => import('../pages/GamificationHub'));
const NotFound = lazy(() => import('../pages/NotFound'));

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length && !roles.includes(user.publicMetadata?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <SuspenseWrapper>{children}</SuspenseWrapper>;
};

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

const DashboardRouter = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role || ROLES.USER;

  switch (userRole) {
    case ROLES.ADMIN:
      return <AdminDashboard />;
    case ROLES.LEADER:
      return <LeaderDashboard />;
    default:
      return <UserDashboard />;
  }
};

export default function AppRoutes() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<SuspenseWrapper><PublicRoutes /></SuspenseWrapper>}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="plans" element={<Plans />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="gdpr" element={<GDPRPage />} />
        <Route path="login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="dashboard" element={<DashboardRouter />} />
        <Route path="network" element={<Network />} />
        <Route path="profile" element={<Profile />} />
        <Route path="gamification" element={<GamificationHub />} />
        <Route path="onboarding" element={<Onboarding />} />

        {/* Admin Routes */}
        <Route path="admin">
          <Route index element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="users" element={
            <ProtectedRoute roles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="rewards" element={
            <ProtectedRoute roles={['admin']}>
              <RewardsManagement />
            </ProtectedRoute>
          } />
          <Route path="investment-plans" element={
            <ProtectedRoute roles={['admin']}>
              <InvestmentPlans />
            </ProtectedRoute>
          } />
          <Route path="tasks" element={
            <ProtectedRoute roles={['admin']}>
              <TaskManagement />
            </ProtectedRoute>
          } />
          <Route path="pools" element={
            <ProtectedRoute roles={['admin']}>
              <PoolManagement />
            </ProtectedRoute>
          } />
          <Route path="tokens" element={
            <ProtectedRoute roles={['admin']}>
              <TokenManagement />
            </ProtectedRoute>
          } />
          <Route path="frontend/*" element={
            <ProtectedRoute roles={['admin']}>
              <FrontendManager />
            </ProtectedRoute>
          } />
          <Route path="tools/balance" element={
            <ProtectedRoute roles={['admin']}>
              <BalanceAdjustment />
            </ProtectedRoute>
          } />
          <Route path="tools/ranks" element={
            <ProtectedRoute roles={['admin']}>
              <RankAdjustment />
            </ProtectedRoute>
          } />
        </Route>
      </Route>

      {/* Add catch-all route at the end */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
