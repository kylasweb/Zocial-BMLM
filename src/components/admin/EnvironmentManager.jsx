import { useUser } from '@clerk/clerk-react';
import { SUPER_ADMIN_CREDENTIALS } from '../../config/roles';

const EnvironmentManager = () => {
  const { user } = useUser();
  
  const isSuperAdmin = user?.primaryEmailAddress?.emailAddress === SUPER_ADMIN_CREDENTIALS.email;

  if (!isSuperAdmin) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Only Super Admin can access this page
      </div>
    );
  }

  // Rest of the component...
};