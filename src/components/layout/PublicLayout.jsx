import React from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import AdminBar from '../admin/AdminBar';

export default function PublicLayout({ children }) {
  const location = useLocation();
  const { user } = useUser();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isAdmin = user?.publicMetadata?.role === 'admin';

  // Don't show header and footer on auth pages
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {isAdmin && <AdminBar />}
      <PublicHeader />
      <main className={`flex-grow ${isAdmin ? 'mt-10' : ''}`}>
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
