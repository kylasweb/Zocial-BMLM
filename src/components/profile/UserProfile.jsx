import { UserProfile } from '@clerk/clerk-react';

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <UserProfile 
        appearance={{
          elements: {
            card: 'bg-white shadow-xl rounded-lg',
            navbar: 'bg-primary-600',
          }
        }}
      />
    </div>
  );
}