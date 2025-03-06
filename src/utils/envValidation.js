import { z } from 'zod';

const envSchema = z.object({
  NODE_VERSION: z.string().regex(/^\d+$/),
  NODE_ENV: z.enum(['development', 'production', 'staging']),
  VITE_API_URL: z.string().url(),
  REACT_APP_API_URL: z.string().url(),
  VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  SENTRY_DSN: z.string().url(),
  VITE_WEB3_NETWORK: z.enum(['testnet', 'mainnet']),
  VITE_TOKEN_DISTRIBUTOR_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  NETLIFY_AUTH_TOKEN: z.string().min(1),
  NETLIFY_SITE_ID: z.string().min(1),
  CORS_ORIGIN: z.string().url(),
  MONGODB_URI: z.string().regex(/^mongodb(\+srv)?:\/\/.+/)
});

export function validateEnv(env) {
  try {
    const result = envSchema.safeParse(env);
    
    if (!result.success) {
      const errorMessages = result.error.errors.map(error => 
        `${error.path.join('.')}: ${error.message}`
      ).join('\n');
      
      throw new Error(`Environment validation failed:\n${errorMessages}`);
    }

    return true;
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw error;
  }
}
