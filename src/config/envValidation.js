import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VITE_API_URL: z.string().url(),
  VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  SENTRY_DSN: z.string().url(),
  VITE_WEB3_NETWORK: z.enum(['testnet', 'mainnet']),
  VITE_TOKEN_DISTRIBUTOR_ADDRESS: z.string().min(1),
  NETLIFY_AUTH_TOKEN: z.string().min(1),
  NETLIFY_SITE_ID: z.string().min(1)
});

export function validateEnv() {
  try {
    const result = envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      VITE_API_URL: process.env.VITE_API_URL,
      VITE_CLERK_PUBLISHABLE_KEY: process.env.VITE_CLERK_PUBLISHABLE_KEY,
      SENTRY_DSN: process.env.SENTRY_DSN,
      VITE_WEB3_NETWORK: process.env.VITE_WEB3_NETWORK,
      VITE_TOKEN_DISTRIBUTOR_ADDRESS: process.env.VITE_TOKEN_DISTRIBUTOR_ADDRESS,
      NETLIFY_AUTH_TOKEN: process.env.NETLIFY_AUTH_TOKEN,
      NETLIFY_SITE_ID: process.env.NETLIFY_SITE_ID
    });
    
    console.info('Environment validation passed:', {
      NODE_ENV: result.NODE_ENV,
      API_URL: result.VITE_API_URL,
      WEB3_NETWORK: result.VITE_WEB3_NETWORK,
      // Mask sensitive values
      CLERK_KEY: result.VITE_CLERK_PUBLISHABLE_KEY ? '✓ Set' : '✗ Missing',
      SENTRY_DSN: result.SENTRY_DSN ? '✓ Set' : '✗ Missing',
      NETLIFY_CONFIG: (result.NETLIFY_AUTH_TOKEN && result.NETLIFY_SITE_ID) ? '✓ Set' : '✗ Missing'
    });
    
    return true;
  } catch (error) {
    console.error('❌ Environment validation failed:', error.errors);
    throw error;
  }
}
