import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { validateJWT, checkPermissions } from '../utils/auth';

export const securityMiddleware = {
  rateLimiter: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP'
  }),

  helmet: helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'wss:', 'https:']
      }
    }
  }),

  validateRequest: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await validateJWT(token);
      const permissions = await checkPermissions(user);
      
      req.user = { ...user, permissions };
      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized access' });
    }
  }
};