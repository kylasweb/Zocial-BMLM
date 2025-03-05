import { ApiError } from '../utils/ApiError';
import { errorHandler } from '../utils/errorHandling';

export const errorMiddleware = async (err, req, res, next) => {
  // Log error for monitoring
  console.error(err);

  // Handle known errors
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      status: 'error',
      message: err.message,
      errors: err.errors,
      code: err.code
    });
  }

  // Handle Clerk errors
  if (err.clerkError) {
    return res.status(err.status || 401).json({
      status: 'error',
      message: 'Authentication error',
      code: 'AUTH_ERROR'
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message
      })),
      code: 'VALIDATION_ERROR'
    });
  }

  // Handle database errors
  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    return res.status(500).json({
      status: 'error',
      message: 'Database error',
      code: 'DB_ERROR'
    });
  }

  // Use error handler for automatic healing
  await errorHandler.handleError(err, {
    context: {
      path: req.path,
      method: req.method,
      userId: req.auth?.userId
    }
  });

  // Default error response
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    code: 'INTERNAL_ERROR'
  });
};