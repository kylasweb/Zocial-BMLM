import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { ApiError } from '../utils/ApiError';

export const authenticate = ClerkExpressRequireAuth({
  onError: (err, req, res, next) => {
    throw new ApiError(401, 'Authentication required');
  }
});

export const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      const { role } = req.auth;
      
      if (!roles.includes(role)) {
        throw new ApiError(403, 'Insufficient permissions');
      }
      
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateSession = async (req, res, next) => {
  try {
    const session = await req.auth.getSession();
    
    if (!session || session.status !== 'active') {
      throw new ApiError(401, 'Invalid or expired session');
    }
    
    next();
  } catch (error) {
    next(error);
  }
};