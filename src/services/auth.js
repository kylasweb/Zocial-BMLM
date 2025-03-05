import { SUPER_ADMIN_CREDENTIALS, ROLES } from '../config/roles';

export const authService = {
  login: async (email, password) => {
    // Special handling for super admin
    if (email === SUPER_ADMIN_CREDENTIALS.email) {
      if (password !== SUPER_ADMIN_CREDENTIALS.password) {
        throw new Error('Invalid super admin credentials');
      }
      return {
        role: ROLES.SUPER_ADMIN,
        permissions: ['*'],
        isSuperAdmin: true
      };
    }
    
    // Regular login logic...
  },

  validateAccess: (user, requiredRole) => {
    if (user.email === SUPER_ADMIN_CREDENTIALS.email) {
      return true; // Super admin has access to everything
    }
    // Regular access validation...
  }
};