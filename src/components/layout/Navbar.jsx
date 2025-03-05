import { UserButton } from '@clerk/clerk-react';
import { FiBell, FiMenu } from 'react-icons/fi';

export default function Navbar({ onMenuClick }) {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <FiMenu className="h-6 w-6" />
      </button>
      
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          {/* Add search or other elements here */}
        </div>
        
        <div className="ml-4 flex items-center md:ml-6">
          {/* Notifications */}
          <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <span className="sr-only">View notifications</span>
            <FiBell className="h-6 w-6" />
          </button>

          {/* Profile dropdown */}
          <div className="ml-3">
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: 'w-8 h-8'
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
