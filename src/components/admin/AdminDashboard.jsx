import { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import UserManagement from './UserManagement';
import FinanceManagement from './FinanceManagement';
import InvestmentPlans from './InvestmentPlans';
import PoolManagement from './PoolManagement';
import RankManagement from './RankManagement';
import SystemStats from './SystemStats';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState('overview');
  const user = useSelector(state => state.auth.user);

  const renderContent = () => {
    switch(currentView) {
      case 'users':
        return <UserManagement />;
      case 'finance':
        return <FinanceManagement />;
      case 'investments':
        return <InvestmentPlans />;
      case 'pools':
        return <PoolManagement />;
      case 'ranks':
        return <RankManagement />;
      default:
        return <SystemStats />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}