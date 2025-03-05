import { z } from 'zod';
import { errorHandler } from '../utils/errorHandling';

const adminCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12)
});

export const authService = {
  login: async (email, password) => {
    try {
      // Generic error message for all auth failures
      const invalidCredentialsError = new Error('Invalid credentials');

      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (!adminEmail || !adminPassword) {
        throw new Error('Admin credentials not configured');
      }

      // Validate admin credentials format
      adminCredentialsSchema.parse({ email: adminEmail, password: adminPassword });

      if (email === adminEmail) {
        // Use timing-safe comparison for password
        const isValid = await crypto.subtle.timingSafeEqual(
          new TextEncoder().encode(password),
          new TextEncoder().encode(adminPassword)
        );

        if (!isValid) {
          throw invalidCredentialsError;
        }

        return {
          role: 'ADMIN',
          permissions: ['*'],
          isAdmin: true
        };
      }

      // Regular login logic...
      
    } catch (error) {
      await errorHandler.handleError(error, { context: 'auth_service' });
      throw invalidCredentialsError; // Always return generic error
    }
  },

  validateAccess: (user, requiredRole) => {
    try {
      if (!user || !requiredRole) {
        return false;
      }

      if (user.role === 'ADMIN') {
        return true;
      }

      // Regular role-based access control...
      return user.role === requiredRole;
    } catch (error) {
      errorHandler.handleError(error, { context: 'access_validation' });
      return false; // Fail secure
    }
  }
};
