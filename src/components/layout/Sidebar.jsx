import { NavLink } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { 
  FiHome, 
  FiUsers, 
  FiUser, 
  FiAward,
  FiSettings
} from 'react-icons/fi';

export default function Sidebar({ mobile = false }) {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  const navigationLinks = [
    { to: "/dashboard", icon: FiHome, label: "Dashboard" },
    { to: "/network", icon: FiUsers, label: "My Network" },
    { to: "/profile", icon: FiUser, label: "Profile" },
    { to: "/gamification", icon: FiAward, label: "Rewards" },
  ];

  const adminLinks = [
    { to: "/admin", icon: FiSettings, label: "Admin Dashboard" },
  ];

  const renderLinks = (links) => (
    links.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        className={({ isActive }) =>
          `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            isActive
              ? 'bg-primary-100 text-primary-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`
        }
      >
        <link.icon
          className={`mr-3 flex-shrink-0 h-6 w-6 ${
            isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
          }`}
        />
        {link.label}
      </NavLink>
    ))
  );

  const sidebarContent = (
    <>
      <div className="flex items-center flex-shrink-0 px-4 h-16">
        <img
          className="h-8 w-auto"
          src="/logo.svg"
          alt="Zocial"
        />
      </div>
      <div className="mt-5 flex-1 flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {renderLinks(navigationLinks)}
          {isAdmin && (
            <>
              <hr className="my-4 border-gray-200" />
              {renderLinks(adminLinks)}
            </>
          )}
        </nav>
      </div>
    </>
  );

  return mobile ? (
    <div className="h-0 flex-1 flex flex-col overflow-y-auto">
      {sidebarContent}
    </div>
  ) : (
    <div className="w-64 flex flex-col">
      <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
        {sidebarContent}
      </div>
    </div>
  );
}
