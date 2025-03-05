import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).optional().default('development'),
  SENTRY_DSN: z.string().url().optional(),
  VITE_CLERK_PUBLISHABLE_KEY: z.string().optional() // Made optional for monitoring setup
});

export function validateEnv() {
  try {
    const result = envSchema.parse(process.env);
    
    // Log available environment variables
    console.log('Environment configuration:', {
      NODE_ENV: result.NODE_ENV,
      SENTRY_DSN: result.SENTRY_DSN ? '(set)' : '(not set)',
      VITE_CLERK_PUBLISHABLE_KEY: result.VITE_CLERK_PUBLISHABLE_KEY ? '(set)' : '(not set)'
    });
    
    return true;
  } catch (error) {
    console.error('Environment validation failed:', error.errors);
    throw error;
  }
}
