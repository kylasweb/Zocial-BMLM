import { SUPER_ADMIN_CREDENTIALS, ROLES } from '../config/roles';
import { hashPassword } from '../utils/auth';

export async function seedDatabase() {
  // Create super admin if not exists
  const superAdmin = await User.findOne({ 
    email: SUPER_ADMIN_CREDENTIALS.email 
  });

  if (!superAdmin) {
    await User.create({
      email: SUPER_ADMIN_CREDENTIALS.email,
      password: await hashPassword(SUPER_ADMIN_CREDENTIALS.password),
      role: ROLES.SUPER_ADMIN,
      name: 'Super Admin',
      id: 'SUPER_ADMIN',
      permissions: ['*'],
      metadata: {
        isSuperAdmin: true,
        createdAt: new Date(),
        lastLogin: null
      }
    });
  }

  // Rest of the seeding logic...
}